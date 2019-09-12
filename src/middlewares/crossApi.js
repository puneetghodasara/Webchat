import qs from 'query-string'
import axios from 'axios'

export default store => next => action => {
  if (!action.type.startsWith('CROSSAPI:')) {
    return next(action)
  }

  const { dispatch } = store
  const prefix = action.type.split(':')[1]
  const { method = 'get', url, data, headers, query } = action.payload

  const options = {
    method,
    data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    url: `${url}${query ? '?' : ''}${qs.stringify(query || {})}`,
  }

  const csrfOpt = {
    headers: {
      'x-csrf-token': 'Fetch',
    },
    method: "GET",
    url: `${url}`,
  }

  return axios(csrfOpt)
    .then((res) => {
      console.log(res.headers["x-csrf-token"])
      options.headers["x-csrf-token"] = res.headers["x-csrf-token"];
      return axios(options)
    })
    .then(res => {
      dispatch({ type: `${prefix}_SUCCESS`, payload: { ...res.data.results } })
      return res.data.results
    })
    .catch(err => {
      dispatch({ type: `${prefix}_ERROR`, payload: data })
      throw new Error(err)
    })
}
