// const React = lib.react
import React from 'react'
//import { SvgIcon } from '@material-ui/core'
import {default as Icon} from '@ant-design/icons'

const StyleSvg = () => {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path d="M796.444672 56.889344c37.925888 0 56.88832 18.962432 56.88832 56.88832V512c0 56.889344-199.110656 28.444672-227.555328 85.332992-28.444672 56.889344 0 199.11168 0 227.556352 0 28.443648 0 142.221312-113.777664 142.221312s-113.777664-113.77664-113.777664-142.221312c0-28.444672 28.444672-170.667008 0-227.556352C369.77664 540.444672 170.667008 568.889344 170.667008 512V113.777664c0-37.925888 18.962432-56.88832 56.88832-56.88832h568.889344z m0 227.555328H227.555328v204.99456c10.979328 2.740224 26.42944 5.195776 53.741568 8.83712 6.15424 0.8192 6.15424 0.8192 12.4416 1.664 93.700096 12.649472 131.45088 24.12032 155.3664 71.95136 16.590848 33.181696 20.67968 76.36992 17.878016 132.754432-1.041408 20.963328-2.996224 42.380288-5.925888 67.76832-0.423936 3.67616-1.224704 10.355712-2.02752 17.011712l-0.180224 1.49504c-1.001472 8.2944-1.96096 16.196608-2.147328 17.789952-1.08544 9.288704-1.591296 14.892032-1.591296 16.178176 0 57.38496 12.422144 85.332992 56.889344 85.332992 30.396416 0 42.82368-10.43968 50.661376-34.823168 4.840448-15.059968 6.227968-29.889536 6.227968-50.509824 0-1.286144-0.505856-6.889472-1.591296-16.178176-0.346112-2.96448-3.36896-27.7504-4.355072-36.297728-2.92864-25.387008-4.88448-46.803968-5.925888-67.767296-2.801664-56.384512 1.287168-99.572736 17.878016-132.754432 23.91552-47.83104 61.666304-59.301888 155.3664-71.95136l5.869568-0.78848 0.801792-0.106496 5.77024-0.768c27.311104-3.642368 42.76224-6.09792 53.741568-8.838144v-204.99456z m0-170.667008H227.555328v113.777664h568.889344v-113.77664z" p-id="7119"></path>
    </svg>
  )
}

const Style = (props) => {
  return (
    <Icon component={StyleSvg} {...props} />
  )
}

export default Style
