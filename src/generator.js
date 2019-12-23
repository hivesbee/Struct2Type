const typeSwitchMap = {
  'bool': 'boolean',
  'int': 'number',
  '*time.Time': 'string'
}

const switchTypeName = (type) => typeSwitchMap[type] || type


const generate = (json) => {
  const lines = []

  // type 定義
  const head = `type ${json.name} = {`

  // field 定義
  let fields = []
  if (json.fields) {
    fields = json.fields
      .filter(f => f.name && f.type && f.tag)
      .map(f => {
        const name = f.tag.replace(/'|"|`/g, '').split(':')[1]
        
        return `  ${name}: ${switchTypeName(f.type)}`
      })
  }

  return [head, ...fields, '}'].join('\n')
}

export {
  generate
}