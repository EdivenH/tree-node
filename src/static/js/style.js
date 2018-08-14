const SettingPanelStyle = {
    position: 'absolute',
    left: '100%',
    top: '0',
    display: 'flex',
    flexDirection: 'column',
    width: '100px',
    marginLeft: '10px',
    zIndex: '100',
    cursor: 'default',
    color: '#787878',
    padding: '4px 9px',
    fontSize: '12px',
    borderRadius: '2px',
    boxShadow: '0 0 3px 0 #C8C8C8, 0 0 8px 0 rgba(0,0,0,.12)',
    background: '#fff'
}
const SettingBackStyle = {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: '0',
    zIndex: '50'
}

const InputStyle = {
    width: '60%',
    height: '18px',
    lineHeight: '18px',
    color: '#000'
}
const dropStyle = {
    border: '5px solid transparent',
    borderTopColor: '#939599',
    borderLeftColor: 'transparent',
    width: '0',
    height: '0',
    marginRight: '10px'
}


export {SettingPanelStyle, SettingBackStyle, InputStyle, dropStyle}