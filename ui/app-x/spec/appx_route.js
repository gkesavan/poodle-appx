import {
  REGEX_VAR,
  classes
} from 'app-x/spec/classes.js'

// type: appx/route                                  (~expression)
// name:                     # route folder name     (:string|:expression) - default to '/'
export const appx_route = {

  name: 'appx/route',
  desc: 'Routes',
  classes: [
    {
      class: 'expression',
    }
  ],
  _group: 'appx',
  children: [
    {
      name: 'name',
      desc: 'Router Path',
      classes: [
        {
          class: 'string'
        },
      ],
      rules: [
        {
          kind: 'required',
          required: true,
          message: 'Router path is required',
        },
      ],
      _inputs: [
        {
          input: 'js/string'
        }
      ],
    },
  ]
}

export default appx_route
