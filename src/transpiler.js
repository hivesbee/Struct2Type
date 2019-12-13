const typeSwitchMap = {
  bool: 'boolean',
  int: 'number'
}

const switchTypeName = (type) => typeSwitchMap[type] || type

// データ整理
const regularize = (struct) => {
  const lines = struct.split('\n')
  const headLine = lines[0]
  const bodyLines = lines.slice(1, lines.length - 1).map(line => {
    const l = line.split('`')
    const ll = l[0].split(/\s+/g).filter(x => x).concat(l[1])

    return [ll[0], ll[1], l[1]]
  })

  return {
    headLine,
    bodyLines
  }
}

const analyze = (headLine, bodyLines) => {
  const name = headLine.split(/\s+/g)[1]
  const keyTypes = bodyLines.map(([structName, type, tags]) => {
    if (!type || !tags) {
      return null
    }

    const jsonTag = tags.split(' ').map(tag => {
      const [ key, value ] = tag.split(':')
      return {
        key,
        value: value.replace(/"/g, '')
      }
    }).find(kv => kv.key === 'json' && kv.value !== '-')

    if (!jsonTag) {
      return null
    }

    return {
      key: jsonTag.value,
      type: switchTypeName(type)
    }
  }).filter(keyType => keyType)

  return {
    name,
    keyTypes
  }
}

const build = (name, keyTypes) => {
  const headLine = `type ${name} = {`
  const bodyLines = keyTypes.map(kt => `  ${kt.key}: ${kt.type}`).join(',\n')

  return [headLine, bodyLines, '}'].join('\n')
}

export default (structLines) => {
  // 理解
  const { headLine, bodyLines } = regularize(structLines)

  // 分解
  const { name, keyTypes } = analyze(headLine, bodyLines)

  // 再構築
  const typeLines = build(name, keyTypes)

  return typeLines
}