import React from 'react'
import { observer } from 'startupjs'
import propTypes from 'prop-types'
import Row from './../../Row'
import Div from './../../Div'
import Span from './../../typography/Span'
import Checkbox from './checkbox'
import Switch from './switch'
import { useLayout } from './../../../hooks'
import './index.styl'

const INPUT_COMPONENTS = {
  checkbox: Checkbox,
  switch: Switch
}

const READONLY_ICONS = {
  TRUE: '✔',
  FALSE: '✘'
}

function CheckboxInput ({
  style,
  className,
  variant,
  label,
  value,
  layout,
  disabled,
  readOnly,
  onChange,
  hoverStyle,
  activeStyle,
  ...props
}) {
  const _layout = useLayout(layout, label)
  const pure = _layout === 'pure'

  function onPress () {
    onChange && onChange(!value)
  }

  function renderInput (standalone) {
    const Input = INPUT_COMPONENTS[variant]

    if (readOnly) {
      return pug`
        Row.checkbox-icon-wrap(
          styleName=[variant]
        )
          Span.checkbox-icon(
            styleName={readOnly}
          )=value ? READONLY_ICONS.TRUE : READONLY_ICONS.FALSE
      `
    }

    return pug`
      Input(
        style=standalone ? style : {}
        className=standalone ? className : undefined
        value=value
        disabled=disabled
        onPress=standalone ? onPress : null /* fix double opacity on input element for rows variant */
        hoverStyle=standalone ? hoverStyle : null
        activeStyle=standalone ? activeStyle : null
        ...props
      )
    `
  }

  if (pure) return renderInput(true)

  return pug`
    Row.root(
      style=style
      className=className
      vAlign='center'
      disabled=disabled
      onPress=!readOnly && onPress
      hoverStyle=hoverStyle
      activeStyle=activeStyle
    )
      = renderInput()
      Div.label
        if typeof label === 'string'
          Span= label
        else
          = label
  `
}

CheckboxInput.defaultProps = {
  variant: 'checkbox',
  value: false,
  disabled: false,
  readOnly: false
}

CheckboxInput.propTypes = {
  style: propTypes.oneOfType([propTypes.object, propTypes.array]),
  variant: propTypes.oneOf(['checkbox', 'switch']),
  label: propTypes.node,
  value: propTypes.bool,
  layout: propTypes.oneOf(['pure', 'rows']),
  disabled: propTypes.bool,
  readOnly: propTypes.bool,
  onChange: propTypes.func
}

export default observer(CheckboxInput)
