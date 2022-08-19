
import ArrowView from './components/controls/ArrowView'
import CircleBar from './components/controls/CircleBar'
import HorizontalBar from './components/controls/HorizontalBar'
import LoadingCom from './components/controls/LoadingCom'
import NavigationMenu from './components/controls/NavigationMenu'
import PageLoading from './components/controls/PageLoading'
import TableView from './components/controls/TableView'
import TextLabel from './components/controls/TextLabel'
import BorderPane from './components/layout/BorderPane'
import Card       from './components/layout/TitlePane'
import Popup      from './components/layout/Popup'
import Key from './components/controls/electro_scheme/Key'
import Alarm from './components/controls/images/Alarm'
import Info from './components/controls/images/Info'
import Warning from './components/controls/images/Warning'
import Button from './components/controls/input/Button'
import ComboBox from './components/controls/input/ComboBox'
import TextField from './components/controls/input/TextField'
import Row from './components/layout/row/Row'
import Slider from './components/controls/input/slider/Slider'
import Toggle from './components/controls/input/toggle/Toggle'

const components = [
    ArrowView,
CircleBar,
HorizontalBar,
LoadingCom,
NavigationMenu,
PageLoading,
TableView,
TextLabel,
BorderPane,
Card,
Popup,
Key,
Alarm,
Info,
Warning,
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
    ArrowView,
CircleBar,
HorizontalBar,
LoadingCom,
NavigationMenu,
PageLoading,
TableView,
TextLabel,
BorderPane,
Card,
Popup,
Key,
Alarm,
Info,
Warning,
Button,
ComboBox,
TextField,
Row,
Slider,
Toggle
}
