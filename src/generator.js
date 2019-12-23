
const generate = (json) => {
  const lines = []

  // type 定義
  const head = `type ${json.name} = {`

  // field 定義
  let fields = []
  if (json.fields) {
    fields = json.fields.map(f => {
      const name = f.tag.replace(/'|"|`/g, '').split(':')[1]
      
      return `  ${name}: ${f.type}`
    })
  }

  return [head, ...fields, '}'].join('\n')
}

export {
  generate
}