import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'

import { truncate, getId } from 'helpers'

import './style.scss'
import '../Checkbox/style.scss'

const CheckboxElement = ({ title, subtitle, value, checkedColor, handleChange }) => {

  const titleMaxLength = 30
  const subTitleMaxLength = 100
  const id = getId('zcaicheckbox--');

  return (
    <div className="ZCaiCheckbox">
      <style dangerouslySetInnerHTML={{
        __html: [
          '.ZCaiCheckbox__input::before {',
          '  background: ' + checkedColor + ' !important;',
          '}',
        ].join('\n'),
      }}>
      </style>
      <input
        id={id}
        style={{ margin: '0.3rem' }}
        className="ZCaiCheckbox__input"
        type="checkbox"
        name={value}
        defaultChecked={false}
        onClick={handleChange}
        onTouchEnd={handleChange}
      />
      <label
        htmlFor={id}
        className="ZCaiCheckbox__label"
        style={{ fontSize: '73%', verticalAlign: 'middle', margin: '0.5rem' }}>
        <p className='ZCaiCheckbox--title'
           data-value={value}>{truncate(title, titleMaxLength)}</p>
        <p className='ZCaiCheckbox--subtitle'>{truncate(subtitle, subTitleMaxLength)}</p>
      </label>
    </div>
  )
}

CheckboxElement.prototype = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  value: PropTypes.string,
  checkedColor: PropTypes.string,
  sendMessage: PropTypes.func,
}

const Checkboxes = ({ content, checkedColor, sendMessage, style }) => {
  const { title, elements, buttons } = content
  const button = buttons && buttons[0]

  let sendCheckedMessage = () => {
    const checked = elements.filter(c => c.checked)
    sendMessage({ type: 'button', content: button, elements: checked }, title)
  }

  return (
    <div className='CaiCheckboxes'>
      <p className='CaiCheckboxes--title' style={style}>
        {truncate(title, 640)}
      </p>

      <div className='CaiCheckboxes--container'>
        {elements.slice(0, 10).map((c, i) => (
          <CheckboxElement key={i} {...c} checkedColor={checkedColor} handleChange={() => {
            c.checked = !c.checked
          }}/>
        ))}
      </div>

      {button && (
        <div className='RecastAppList--button CaiAppList--button'>
          <Button button={button} sendMessage={sendCheckedMessage}/>
        </div>
      )}

    </div>
  )
}

Checkboxes.propTypes = {
  style: PropTypes.object,
  sendMessage: PropTypes.func,
  content: PropTypes.object,
}

export default Checkboxes
