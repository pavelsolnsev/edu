import { Cookies } from 'quasar';
import { api } from 'src/boot/axios';

export function rewriteRelations(relation) {
  return (relation && Array.isArray(relation)) ? relation.map(rewriteRelations)
    : relation.id ?? null;
}

export function rewriteAttributes(data) {
  if (Array.isArray(data)) return data.map(rewriteAttributes);
  const result = data.attributes ?? {};
  if (data.id) result.id = data.id;
  if (data.relationships && typeof data.relationships === 'object') {
    const resultRel = Object.keys(data.relationships).reduce((acc, key) => {
      if (data.relationships[key].data) acc[key] = rewriteRelations(data.relationships[key].data);
      return acc;
    }, {});
    if (Object.keys(resultRel).length > 0) result.rel = resultRel;
  }
  return result;
}

export function rewriteIncluded(included) {
  return (included && Array.isArray(included) ? included : []).reduce((acc, item) => {
    const relation = item.type;
    if (!acc[relation]) acc[relation] = {};
    acc[relation][item.id] = rewriteAttributes(item);
    return acc;
  }, {});
}

export function rel(item, data, relation, included) {
  if (!included) included = relation;
  return data?.rel?.[included]?.[
    Array.isArray(item.rel?.[relation]) ? item.rel?.[relation][0] : item.rel?.[relation]
  ] ?? null;
}

export function rels(item, data, relation, included) {
  if (!included) included = relation;
  return item?.rel?.[relation]
    ? (Array.isArray(item.rel[relation]) ? item.rel[relation] : [item.rel[relation]])
      .map((id) => data.rel[included][id]) : [];
}

export function rewriteResponseData(data) {
  return data.meta && data.data ? {
    meta: data.meta,
    data: data.data ? rewriteAttributes(data.data) : null,
    rel: data.included ? rewriteIncluded(data.included) : null,
  } : null;
}

export const clearWhiteSpace = (s) => s.replace(/\s+/gm, '');

export function mapItemRelations(r, m) {
  if (r.data && m) {
    r.data = r.data.map((item) => {
      Object.keys(m).forEach((key) => {
        const relation = m[key]?.relation ?? key;
        const type = m[key]?.type ?? m[key];
        item[key] = item.rel?.[relation] && Array.isArray(item.rel[relation])
          ? rels(item, r, relation, type)
          : rel(item, r, relation, type);
      });
      return item;
    });
  }
  return r;
}

export async function getAll(url, params) {
  const { entity, map } = params;
  if (entity) delete params.entity;
  if (map) delete params.map;

  if (params.include) params.include = clearWhiteSpace(params.include);

  if (params.calculation_data && entity) {
    if (typeof params.calculation_data === 'string') {
      params.calculation_data = { [entity]: params.calculation_data };
    }
    params.calculation_data = Object.keys(params.calculation_data).reduce((acc, item) => {
      acc[item] = clearWhiteSpace(params.calculation_data[item]);
      return acc;
    }, {});
  }

  if (params.fields) {
    if (typeof params.fields === 'string') params.fields = { data: params.fields };
    if (params.fields.data && entity) {
      params.fields[entity] = params.include ? `${params.fields.data},${params.include}` : params.fields.data;
      delete params.fields.data;
    }
    params.fields = Object.keys(params.fields).reduce((acc, item) => {
      acc[item] = clearWhiteSpace(params.fields[item]);
      return acc;
    }, {});
  }

  const response = await api.get(url, params ? { params } : {});

  return mapItemRelations(rewriteResponseData(response.data), map);
}

export async function getOne(url, params) {
  const result = await getAll(url, params);
  if (result.data?.[0]) [result.data] = result.data;
  return result;
}

export async function forgetCache(uri) {
  const result = await api.post('/cache-forget', { uri });
  return result;
}

export function setAccessToken(token, expires, ctx) {
  const cookies = process.env.SERVER && ctx?.ssrContext
    ? Cookies.parseSSR(ctx.ssrContext)
    : Cookies;
  const options = {
    path: '/',
    expires: `${expires ?? '3600'}s`,
  };
  if (!api.hostnames.isLocalhost) {
    options.domain = `.${api.hostnames.cookieDomain}`;
  }
  if (token) {
    if (cookies?.set) cookies.set(api.hostnames.accessTokenName, token, options);
  } else {
    delete options.expires;
    if (cookies?.remove) cookies.remove(api.hostnames.accessTokenName, options);
  }
}

export function getAccessToken(ctx) {
  const cookies = process.env.SERVER && ctx?.ssrContext
    ? Cookies.parseSSR(ctx.ssrContext)
    : Cookies;
  return cookies?.get ? cookies.get(api.hostnames.accessTokenName) : null;
}
