import { button_types } from '../button_types'

options = {
   type: {
      type: button_types,
   },
   text: {
      type: String,
   },
   isBusy: {
      type: Boolean,
      desc: 'Используется только для button_types.loadingButton'
   }
}