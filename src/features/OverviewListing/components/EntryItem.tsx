
// const EntryItem = () => {

//     if (entry.item_type === 'meal') {
//         return (<MealItem meal={entry as IMeal} key={entry.id} />)
//     }
//     if (entry.item_type === 'symptoms') {
//         return (<div className="flex gap-x-2 bg-purple-50 px-4 py-4 mb-4 shadow-lg rounded-md">
//             {entry?.symptoms?.map((entry: ISymptom, index) => (
//                 <SymptomSummaryItem symptom={entry as ISymptom} key={'symptom_' + index.toString() + '_' + entry.id.toString()} />
//             ))}
//         </div>)
//     }

//     return null
// }