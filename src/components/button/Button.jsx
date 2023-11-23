export const Button = ({localizedValue, className, onClick}) => {
  return (
    <button type="submit" className={className} onClick={onClick}>
      {localizedValue}
    </button>
  )
}
