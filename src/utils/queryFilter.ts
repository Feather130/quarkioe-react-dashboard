/* eslint-disable */
type ParamsLayout = Array<object | Array<object>> | object;

export class QueryFilter {
  private readonly operatorFns: {
    __and: (operand: ParamsLayout) => string;
    __eq: (operand: ParamsLayout, contextKey: string) => string;
    __gt: (operand: ParamsLayout, contextKey: string) => string;
    __ge: (operand: ParamsLayout, contextKey: string) => string;
    __not: (operand: ParamsLayout) => string;
    __lt: (operand: ParamsLayout, contextKey: string) => string;
    __le: (operand: ParamsLayout, contextKey: string) => string;
    __in: (operand: Array<object | Array<object>>, contextKey: string) => string;
    __has: (operand: ParamsLayout) => string;
    __bygroupid: (operand: string | number) => string;
    __or: (operand: ParamsLayout) => string };

  constructor() {
    this.operatorFns = {
      __not: (operand) => {
        return ['not(', this.buildQueryFilter(operand, null), ')'].join('');
      },
      __and: (operand) => {
        return this.buildQueryFilter(operand, null, 'and');
      },
      __or: (operand) => {
        return this.buildQueryFilter(operand, null, 'or');
      },
      __eq: (operand, contextKey) => {
        if (typeof operand === 'object' && operand !== null) {
          return this.buildQueryFilter(operand, contextKey);
        }
        return [contextKey, 'eq', QueryFilter.quoteString(operand)].join(' ');
      },
      __gt: (operand, contextKey) => {
        return [contextKey, 'gt', QueryFilter.quoteString(operand)].join(' ');
      },
      __ge: (operand, contextKey) => {
        return [contextKey, 'ge', QueryFilter.quoteString(operand)].join(' ');
      },
      __lt: (operand, contextKey) => {
        return [contextKey, 'lt', QueryFilter.quoteString(operand)].join(' ');
      },
      __le: (operand, contextKey) => {
        return [contextKey, 'le', QueryFilter.quoteString(operand)].join(' ');
      },
      __in: (operand, contextKey) => {
        const stmts = operand
          .filter((op) => !!op)
          .map((op) => {
            return [contextKey, 'eq', QueryFilter.quoteString(op)].join(' ');
          });
        return QueryFilter.glue(stmts, 'or');
      },
      __bygroupid: (operand) => {
        return ['bygroupid(', operand, ')'].join('');
      },
      __has: (operand) => {
        return ['has(', operand, ')'].join('');
      },
    };
  }

  buildQuery(query: {
    __orderby: Array<object | Array<object>>;
    __filter:  ParamsLayout}) {
    const q: Array<string> = [];
    const filter = this.buildQueryFilter(query.__filter || query);
    const orderBy = QueryFilter.buildQueryOrderby(query.__orderby);
    if (filter) {
      // q.push(['$filter=(', filter, ')'].join(''));
      q.push(['(', filter, ')'].join(''));
    }
    if (orderBy) {
      q.push(['$orderby=', orderBy].join(''));
    }
    return q.join(' ');
  }

  buildQueryFilter(queryObj: ParamsLayout, _queryKey?: string | null, _glueType?: string) {
    const queryKey = _queryKey || null;
    const glueType = _glueType || 'and';
    const q: Array<any> = [];
    if (Array.isArray(queryObj)) {
      queryObj.forEach((qObj) => {
        const _q = this.buildQueryFilter(qObj, null, glueType);
        if (_q) {
          q.push(_q);
        }
      });
    } else {
      let _q;
      Object.keys(queryObj).forEach((k) => {
        if (this.operatorFns[k] !== undefined) {
          _q = this.operatorFns[k](queryObj[k], queryKey);
          if (_q) {
            q.push(_q);
          }
        } else {
          _q = this.operatorFns.__eq(queryObj[k], k);
          if (_q) {
            q.push(_q);
          }
        }
      });
    }
    return QueryFilter.glue(q, glueType);
  }

  static buildQueryOrderby(query: Array<object | Array<object>>) {
    const o: Array<string> = [];
    if (query) {
      query.forEach((q) => {
        Object.keys(q).forEach((k) => {
          if (q[k] !== 0) {
            o.push([k, q[k] > 0 ? 'asc' : 'desc'].join(' '));
          }
        });
      });
    }
    return o.join(',');
  }

  static glue(stmts: Array<any>, type: string) {
    return stmts.length > 1 ? ['(', stmts.join(`) ${type} (`), ')'].join('') : stmts[0];
  }

  static quoteString(s: any) {
    return typeof s === 'string' ? ["'", s, "'"].join('') : s;
  }
}
