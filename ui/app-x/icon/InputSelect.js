// const React = lib.react
import React from 'react'
//import { SvgIcon } from '@material-ui/core'
import {default as Icon} from '@ant-design/icons'

const InputSwitchSvg = () => {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path d="M190.765176 722.823529a20.058353 20.058353 0 0 0-20.118588 20.058353v80.353883c0 11.083294 9.035294 20.058353 20.118588 20.058353H271.058824c11.083294 0 20.058353-9.035294 20.058352-20.058353v-80.353883A20.058353 20.058353 0 0 0 271.058824 722.823529H190.765176z m301.176471 20.058353a20.058353 20.058353 0 0 0-20.118588 20.118589v40.116705c0 11.083294 9.035294 20.118588 20.118588 20.118589h401.528471c11.083294 0 20.118588-9.035294 20.118588-20.118589v-40.116705a20.058353 20.058353 0 0 0-20.118588-20.118589H491.941647z m-301.176471-301.17647a20.058353 20.058353 0 0 0-20.118588 20.118588V542.117647c0 11.083294 9.035294 20.058353 20.118588 20.058353H271.058824c11.083294 0 20.058353-8.975059 20.058352-20.058353V461.824A20.058353 20.058353 0 0 0 271.058824 441.705412H190.765176z m301.176471 20.118588A20.058353 20.058353 0 0 0 471.823059 481.882353v40.176941c0 11.083294 9.035294 20.058353 20.118588 20.058353h401.528471c11.083294 0 20.118588-9.035294 20.118588-20.058353V481.882353a20.058353 20.058353 0 0 0-20.118588-20.058353H491.941647zM315.030588 106.255059l-99.388235 99.388235-42.586353-42.586353a20.058353 20.058353 0 0 0-28.431059 0l-28.370823 28.431059a20.058353 20.058353 0 0 0 0 28.310588l85.172706 85.232941a19.998118 19.998118 0 0 0 7.710117 4.818824l4.276706 0.963765h4.397177a19.998118 19.998118 0 0 0 12.047058-5.782589l141.974589-141.974588a20.058353 20.058353 0 0 0 0-28.370823l-28.431059-28.431059a20.058353 20.058353 0 0 0-28.370824 0zM491.941647 180.705882a20.058353 20.058353 0 0 0-20.118588 20.058353V240.941176c0 11.083294 9.035294 20.058353 20.118588 20.058353h401.528471c11.083294 0 20.118588-8.975059 20.118588-20.058353v-40.176941A20.058353 20.058353 0 0 0 893.470118 180.705882H491.941647z" p-id="21453"></path>
    </svg>
  )
}

const InputSwitch = (props) => {
  return (
    <Icon component={InputSwitchSvg} {...props} />
  )
}

export default InputSwitch