type Props = {
items: string[];
onRemove: (index: number)=>void;
};

function ItemList({ items, onRemove }: Props) {
return (
    <ul>
    {items.map((item, index) => (
        <li key={index}>{item} <button onClick={() => onRemove(index)}>削除</button></li>
        
    ))}
    </ul>
);
}

export default ItemList;