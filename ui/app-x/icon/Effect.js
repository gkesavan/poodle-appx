// const React = lib.react
import React from 'react'
//import { SvgIcon } from '@material-ui/core'
import {default as Icon} from '@ant-design/icons'

const EffectSvg = () => {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path d="M735.780571 729.124571a36.900571 36.900571 0 0 1 53.284572 0l150.747428 155.428572a39.716571 39.716571 0 0 1 0 54.930286 36.900571 36.900571 0 0 1-53.284571 0l-150.747429-155.428572a39.716571 39.716571 0 0 1 0-54.930286zM683.008 91.574857c5.668571 7.497143 8.740571 16.603429 8.777143 25.856l0.585143 245.869714 202.971428 145.078858c19.163429 13.714286 24.064 40.045714 10.971429 58.806857-5.266286 7.497143-12.873143 12.946286-21.650286 15.579428l-233.764571 69.412572-69.412572 233.764571c-6.582857 22.089143-29.988571 34.121143-52.297143 26.88a43.885714 43.885714 0 0 1-22.089142-16.201143l-145.078858-202.971428-245.869714-0.621715a43.666286 43.666286 0 0 1-43.264-42.203428c-0.256-9.252571 2.56-18.249143 7.936-25.6l144.091429-194.852572-82.505143-234.130285A40.886857 40.886857 0 0 1 194.925714 143.725714l234.130286 82.505143 194.852571-144.091428c18.432-13.604571 44.873143-9.362286 59.062858 9.472z m-52.662857 63.012572l-171.593143 125.988571a43.739429 43.739429 0 0 1-40.96 5.412571l-208.822857-75.702857 75.739428 208.822857c5.12 14.043429 3.072 29.330286-5.412571 40.923429L153.307429 631.588571l218.441142 3.072c14.701714 0.219429 28.745143 7.68 37.558858 19.894858l130.925714 181.76 59.318857-206.921143c3.986286-13.897143 14.665143-24.612571 28.635429-28.635429l206.921142-59.245714-181.796571-130.925714a47.506286 47.506286 0 0 1-19.894857-37.632l-3.072-218.404572z" p-id="16646"></path>
    </svg>
  )
}

const Effect = (props) => {
  return (
    <Icon component={EffectSvg} {...props} />
  )
}

export default Effect
