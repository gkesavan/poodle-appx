import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Grid, makeStyles } from '@material-ui/core'
import { WebOutlined, InsertDriveFileOutlined } from '@material-ui/icons'
import { Layout, Tree } from 'antd'
const { DirectoryTree } = Tree
const { Header, Footer, Sider, Content } = Layout
import { Icon, FileOutlined, ContainerOutlined, CodepenOutlined } from '@ant-design/icons'

import ReactIcon from 'app-x/icon/React'
import ReactElementTree from 'app-x/builder/ReactElementTree'
import PropEditor from 'app-x/builder/PropEditor'


const PATH_SEPARATOR = '/'

const UI_Builder = (props) => {

  console.log(props)

  const styles = makeStyles((theme) => ({
    builder: {
      height: "100%",
      width: "100%",
    },
    footer: {
      width: '100%',
      padding: 0,
    },
    box: {
      minHeight: 200,
      height: '100%',
      minWidth: 300,
      backgroundColor: theme.palette.background.paper,
      border: 1,
      borderStyle: 'solid',
      //borderColor: 'text.secondary',
      borderColor: theme.palette.divider,
      m: 1,
    }
  }))()

  return (
    <Layout className={styles.builder}>
      <Content>Content</Content>
      <Footer className={styles.footer}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box className={styles.box}>
              <ReactElementTree
                namespace={props.namespace}
                ui_name={props.ui_name}
                ui_deployment={props.ui_deployment}
                ui_element_name={props.ui_element_name}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className={styles.box}>
              <PropEditor>
              </PropEditor>
            </Box>
          </Grid>
        </Grid>
      </Footer>
    </Layout>
  )
}

UI_Builder.propTypes = {
  namespace: PropTypes.string.isRequired,
  ui_name: PropTypes.string.isRequired,
  ui_deployment: PropTypes.string.isRequired,
  ui_builder_type: PropTypes.string.isRequired,
  ui_element_name: PropTypes.string.isRequired,
  ui_route_name: PropTypes.string.isRequired,
}

export default UI_Builder