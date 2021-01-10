import {
  REGEX_VAR,
  classes
} from 'app-x/spec/classes.js'

//import {
//  REGEX_VAR,
//  type
//} from 'app-x/spec/classes.js'

// class: react/element                               (~jsx|~expression)
// name:                     # element name          (:string) - autosuggest import
// props:                    # properties            (:object<:any>)
// children:                 # children              (:array<:jsx|:primitive|:expression>)
export const react_element = {

  name: 'react/element',
  desc: 'React Element',
  classes: [
    'jsx',
    'expression',
  ],
  _group: 'react_concepts',
  _expand: true,
  children: [
    {
      name: 'name',
      desc: 'Element Name',
      classes: [
        {
          class: 'string'
        },
      ],
      rules: [
        {
          kind: 'required',
          required: true,
          message: 'Element name is required',
        },
      ],
      _thisNode: [
        {
          class: 'string',
          input: 'input/text',
          suggestions: [
            {
              __class: 'js/call',
              name: {
                __class: 'js/import',
                name: 'app-x/builder/ui/syntax/util_generate.valid_import_names',
              }
            }
          ],
          examples: [
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
      ],
    },
    {
      name: 'props',
      desc: 'Properties',
      optional: true,
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
      _childNode: [
        {
          class: 'object',
          input: 'input/properties',
          generate: 'generate(data)',
          parse: 'parse(node)',
        }
      ]
    },
    {
      name: 'children',
      desc: 'Child Elements',
      optional: true,
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
      _childNode: [
        {
          class: 'array',
          array: true,
          generate: ' \
            thisData.children.map( \
              child => generate(child) \
            ) \
          ',
          parse: ' \
            thisNode.children \
              .filter(child => !child.data._ref) \
              .map(child => parse(child)) \
          ',
        }
      ],
    },
  ]
}

export default react_element
