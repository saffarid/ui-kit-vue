
import Loading from './components/controls/Loading'
import NavigationMenu from './components/controls/NavigationMenu'
import TableView from './components/controls/TableView'
import BorderPane from './components/layout/BorderPane'
import Popup from './components/layout/Popup'
import TitlePane from './components/layout/TitlePane'
import Button from './components/controls/input/Button'
import ComboBox from './components/controls/input/ComboBox'
import TextField from './components/controls/input/TextField'
import Row from './components/layout/row/Row'
import Slider from './components/controls/input/slider/Slider'
import Toggle from './components/controls/input/toggle/Toggle'

const components = [
    Loading,
NavigationMenu,
TableView,
BorderPane,
Popup,
TitlePane,
Button,
ComboBox,
TextField,
Row,
Slider,
Toggle
]

const install = function(Vue){
    components.forEach((node) => {
        Vue.component(node.name, node)
    })
}

export default {
    install
}

export  {
    Loading,
NavigationMenu,
TableView,
BorderPane,
Popup,
TitlePane,
Button,
ComboBox,
TextField,
Row,
Slider,
Toggle
}
