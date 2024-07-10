import React from 'react'

const ErrorList = (props) => {
  const errors = []
  if (typeof props.errors == 'string') {
    errors.push(props.errors)
  } else if (typeof props.errors == 'object') {
    props.errors.map((error) => {
      return errors.push(error)
    })
  }

  //console.log(props.errors)

  return (
    <>
      {errors.length > 0 && (
        <ul className="alert alert-danger ">
          {errors.map((error, key) => {
            return <li key={key}>{error}</li>
          })}
        </ul>
      )}
    </>
  )
}

export default ErrorList
