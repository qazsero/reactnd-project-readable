const AUTH_HEADER = 'github:Qazsero'

export function fetchPosts () {

  return fetch(`http://localhost:3001/posts`, {
    method: 'get',
    headers: {
      'Authorization': AUTH_HEADER
    }
  })
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ recipe }) => recipe))
}


export function fetchCategories () {

  return fetch(`http://localhost:3001/categories`, {
    method: 'get',
    headers: {
      'Authorization': AUTH_HEADER
    }
  })
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
