
function submitOrder(placeName) {
    const checkboxes = document.querySelectorAll('.round-checkbox:checked');
    const note = document.querySelector('.note-input').value;
    
    if (checkboxes.length === 0 && note.trim() === '') {
        alert("Công chúa chưa chọn món nào nè! 🥰");
        return;
    }

    let selectedItems = [];
    checkboxes.forEach(cb => {
        selectedItems.push(cb.value);
    });

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    csvContent += "Địa điểm,Món đã chọn,Ghi chú\n";
    
    let itemsStr = selectedItems.join(" + ");
    csvContent += `"${placeName}","${itemsStr}","${note}"\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LuaChon_${placeName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`Anh đã ghi nhận các món em chọn ở ${placeName} rồi nhé! File Excel đã được tải về 💕`);
}
