import React from 'react'
import { Platform } from 'react-native'
import { observer } from 'startupjs'
import { Span, Tag, themed } from '@startupjs/ui'
import Table from './Table'
import Tbody from './Tbody'
import Thead from './Thead'
import Tr from './Tr'
import Td from './Td'
import TypeCell from './TypeCell'
import ValueCell from './ValueCell'
import './index.styl'

export default observer(themed(function Constructor ({
  Component,
  entries,
  $props,
  style,
  theme
}) {
  return pug`
    Table.table(style=style)
      Thead.thead
        Tr
          Td: Span.header(styleName=[theme]) PROP
          Td: Span.header(styleName=[theme]) TYPE
          Td: Span.header(styleName=[theme]) DEFAULT
          Td: Span.header.right(styleName=[theme]) VALUE
      Tbody
        each entry, index in entries
          - const { name, type, defaultValue, possibleValues, isRequired } = entry
          Tr(key=index)
            Td
              Span.name(
                style={
                  fontFamily: Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace'
                }
              )= name
              if isRequired
                Tag.required(
                  variant='outlined'
                  size='s'
                  color='error'
                  shape='rounded'
                ) Required
            Td: TypeCell(possibleValues=possibleValues type=type)
            Td: Span.value(styleName=[theme])= JSON.stringify(defaultValue)
            Td.vCenter: ValueCell(entry=entry $props=$props)
  `
}))
