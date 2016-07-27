module.exports = {
  files: {
    javascripts: {
      joinTo: {
          'vendor.js': /^(?!app)/
          , 'app.js': /^app/
        }
      }
    , stylesheets: {
        joinTo: 'app.css'
      }
  }

  , plugins: {
      babel: {
          "presets" : ["es2015"]
        ,"plugins": [
              "transform-class-properties"
            , "pipe-operator"
          ]
        , "sourceMaps": "inline"
      }

    , sass : {
          modules : true
        , options : {
            includePaths : [
              "node_modules/bulma"
            ]
          }  
      }
  }
};
