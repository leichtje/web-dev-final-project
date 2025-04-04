import './Board.css'
export function Square({value, onSquareClick}){
    const styles = {
        background: `#fff`,
        border: `1px solid #999`,
        float: `left`,
        fontSize: `24px`,
        fontWeight: 'bold',
        lineHeight: '34px',
        height: '34px',
        marginRight: '-1px',
        marginTop: '-1px',
        padding: `0`,
        textAlign: `center`,
        width: `34px`
    }
    return <button style={styles} onClick={onSquareClick}>{value}</button>
}