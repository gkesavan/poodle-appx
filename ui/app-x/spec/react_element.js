import {
  REGEX_VAR,
  classes
} from 'app-x/spec/classes.js'

//import {
//  REGEX_VAR,
//  type
//} from 'app-x/spec/classes.js'

// class: react/element                               (~jsx|~expression)
// name:                     # element name          (:string|:expression) - autosuggest import
// props:                    # properties            (:object<:any>)
// children:                 # children              (:array<:jsx|:primitive|:expression>)
export const react_element = {

  name: 'react/element',
  desc: 'React Element',
  classes: [
    {
      class: 'jsx',
    },
    {
      class: 'expression',
    }
  ],
  _group: 'react_concepts',
  children: [
    {
      name: 'name',
      desc: 'Element Name',
      classes: [
        {
          class: 'string'
        },
        {
          class: 'expression'
        }
      ],
      rules: [
        {
          kind: 'required',
          required: true,
          message: 'Element name is required',
        },
      ],
      _inputs: [
        {
          input: 'js/import'
        }
      ],
      _suggestions: [
        {
          __class: 'js/call',
          name: {
            __class: 'js/import',
            name: 'app-x/builder/ui/syntax/util_parse.valid_import_names',
          }
        }
      ],
      _examples: [
        '@material-ui/core.Box',
        '@material-ui/core.Grid',
        '@material-ui/core.TextField',
        '@material-ui/icons.AddCircleOutline',
        '@material-ui/icons.RemoveCircleOutline',
        'antd.Layout.Header',
        'antd.Layout.Footer',
        'antd.Layout.Sider',
        'antd.Layout.Content',
      ],
    },
    {
      name: 'props',
      classes: [
        {
          class: 'object',
          classes: [
            {
              name: '.+',
              class: 'any'
            }
          ]
        }
      ],
      _inputs: [
        {
          input: 'js/object'
        }
      ],
      _child: {
        generate: '`generate(data)`',
        parse: '`parse(node)`',
      }
    },
    {
      name: 'children',
      desc: 'Child Elements',
      classes:
      [
        {
          class: 'array',
          classes: [
            {
              class: 'jsx',
            },
            {
              class: 'primitive',
            },
            {
              class: 'expression',
            }
          ]
        }
      ],
      _child: {
        array: true,
        generate: '` \
          parentData.children.map( \
            child => generate(child) \
          ) \
        `',
        parse: ' \
          parentNode._children \
            .filter(child => !child._ref) \
            .map(child => parse(child) \
            ) \
        `',
      }
    },
  ]
}

export default react_element
