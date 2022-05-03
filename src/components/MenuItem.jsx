

export default function MenuItem({item}) {
  console.log(item)
  return (
    <div style={{ padding: '10px', margin: '5px', borderRadius: '5px', boxShadow: '2px 2px 10px #333' }}>
      {item['Nome']}<br />
      €{item['Prezzo']}<br />
    </div>
  )
}