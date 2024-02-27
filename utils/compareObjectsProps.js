const compareObjectsProps = (a, b, prop) => a[prop].toString().localeCompare(b[prop].toString(), undefined, { numeric: true })

export default compareObjectsProps


