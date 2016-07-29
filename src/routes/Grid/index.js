import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'grid',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Grid = require('./containers/GridContainer').default
      const reducer = require('./modules/grid').default

      injectReducer(store, { key: 'grid', reducer })

      /*  Return getComponent   */
      cb(null, Grid)

    /* Webpack named bundle   */
    }, 'grid')
  }
})
