# Project Poodle - App-X

Project Poodle - AppX - app builder

This repo is an application builder that enables easy building of database
schema, rest API, and UI based on user defined model schema.



# Initial setup of App-X service

    -- edit app/init.d/init.yaml
       update credentials and mysql connection info

    $ cd app && npm install && cd -                      (alternatively, 'make build')

    $ cd ui && npm install && cd -                       (alternatively, 'make build')

    $ sudo ./app/init.d/init.sh ./app/init.d/init.yaml   (alternatively, 'make init')

    $ ./app/schema.d/r001.p1/run.sh                      (alternatively, 'make init')

    $ ./app/app.sh -c ./app/conf.d/mysql_appx.conf       (alternatively, 'make')

    -- start a new terminal

    $ http -a 'appx@LOCAL:P@@dle101' 'http://localhost:3000/api/sys/appx/base/namespace'

    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 250
    Content-Type: application/json; charset=utf-8
    Date: Tue, 10 Nov 2020 11:10:16 GMT
    ETag: W/"fa-I89e/KigIlGP3um7khL6W3FkFzI"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    [
        {
            "create_time": "2020-11-10T18:50:08.000Z",
            "id": 1,
            "namespace": "sys",
            "namespace_spec": {
                "a": 5
            },
            "namespace_status": {
                "s": 3
            },
            "owner_name": "appx@LOCAL",
            "owner_realm": "appx",
            "status_time": "2020-11-10T18:57:17.000Z",
            "update_time": "2020-11-10T19:10:05.000Z"
        }
    ]

    --------

    $ echo '{"owner_realm":"appx","owner_name":"appx@LOCAL","namespace_spec":{"a":5}}' | http -a 'appx@LOCAL:P@@dle101' POST 'http://localhost:3000/api/sys/appx/base/namespace/sys'

    HTTP/1.1 200 OK
    Connection: keep-alive
    Content-Length: 15
    Content-Type: application/json; charset=utf-8
    Date: Tue, 10 Nov 2020 11:07:21 GMT
    ETag: W/"f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
    Keep-Alive: timeout=5
    X-Powered-By: Express

    {
        "status": "ok"
    }


    --------

    $ http -a 'appx@LOCAL:P@@dle101' 'http://localhost:3000/api/sys/appx/base/namespace/sys/app/appx/internal/obj?_sort=namespace,obj_spec.comment(desc)'

        [
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "transform_status",
            "obj_spec": {
              "comment": "initialize: transform_status"
            },
            "create_time": "2020-10-27T11:51:06.000Z",
            "update_time": "2020-10-27T11:51:06.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 52
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "transform",
            "obj_spec": {
              "comment": "initialize: transform"
            },
            "create_time": "2020-10-27T11:51:06.000Z",
            "update_time": "2020-10-27T11:51:06.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 49
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "runtime_status",
            "obj_spec": {
              "comment": "initialize: runtime_status"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 16
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "runtime",
            "obj_spec": {
              "comment": "initialize: runtime"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 13
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "relation_status",
            "obj_spec": {
              "comment": "initialize: relation_status"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 34
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "relation",
            "obj_spec": {
              "comment": "initialize: relation"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 31
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "obj_status",
            "obj_spec": {
              "comment": "initialize: obj_status"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 28
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "obj",
            "obj_spec": {
              "comment": "initialize: obj"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 25
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "namespace_status",
            "obj_spec": {
              "comment": "initialize: namespace_state"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 4
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "namespace",
            "obj_spec": {
              "comment": "initialize: namespace"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 1
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "deployment_status",
            "obj_spec": {
              "comment": "initialize: deployment_status"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 22
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "deployment",
            "obj_spec": {
              "comment": "initialize: deployment"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 19
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "attr_status",
            "obj_spec": {
              "comment": "initialize: attr_status"
            },
            "create_time": "2020-10-27T11:51:04.000Z",
            "update_time": "2020-10-27T11:51:04.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 40
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "attr",
            "obj_spec": {
              "comment": "initialize: attr"
            },
            "create_time": "2020-10-27T11:51:04.000Z",
            "update_time": "2020-10-27T11:51:04.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 37
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "app_status",
            "obj_spec": {
              "comment": "initialize: app_status"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 10
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "app",
            "obj_spec": {
              "comment": "initialize: app"
            },
            "create_time": "2020-10-27T11:51:03.000Z",
            "update_time": "2020-10-27T11:51:03.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 7
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "api_status",
            "obj_spec": {
              "comment": "initialize: api_status"
            },
            "create_time": "2020-10-27T11:51:05.000Z",
            "update_time": "2020-10-27T11:51:05.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 46
          },
          {
            "namespace": "sys",
            "app_name": "appx",
            "app_ver": "internal",
            "obj_name": "api",
            "obj_spec": {
              "comment": "initialize: api"
            },
            "create_time": "2020-10-27T11:51:05.000Z",
            "update_time": "2020-10-27T11:51:05.000Z",
            "app_spec": {
              "comment": "initialize"
            },
            "owner_scope": "local",
            "owner_name": "appx",
            "namespace_spec": {
              "comment": "test"
            },
            "id": 43
          }
        ]
