async function submitOrder(placeName) {
    const checkboxes = document.querySelectorAll('.round-checkbox:checked');
    const note = document.querySelector('.note-input').value;
    
    // Kiểm tra xem Tâm đã chọn gì chưa
    if (checkboxes.length === 0 && note.trim() === '') {
        alert("Công chúa chưa chọn món nào nè! 🥰");
        return;
    }

    let selectedItems = [];
    checkboxes.forEach(cb => {
        selectedItems.push(cb.value);
    });

    // 🔴 DÁN LINK FORMSPREE CỦA BẠN VÀO ĐÂY 🔴
    const formspreeURL = "https://formspree.io/f/mbgjypld";

    // Đóng gói dữ liệu chuẩn bị gửi đi
    const orderData = {
        "Địa điểm": placeName,
        "Món đã chọn": selectedItems.join(" + "),
        "Ghi chú": note,
        "Thời gian chọn": new Date().toLocaleString("vi-VN")
    };

    // Tạo hiệu ứng UX: Đổi chữ trên nút để Tâm biết hệ thống đang xử lý
    const submitBtn = event.target; 
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Đang gửi cho anh Dũng... 🚀";
    submitBtn.disabled = true;

    try {
        // Gửi dữ liệu ngầm lên Formspree
        const response = await fetch(formspreeURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            // Thành công
            alert(`Ting ting! Anh đã nhận được thông báo các món em chọn ở ${placeName} rồi nhé! 💕`);
            
            // Xóa tick các món đã chọn để form gọn gàng
            checkboxes.forEach(cb => cb.checked = false);
            document.querySelector('.note-input').value = '';
        } else {
            alert("Ôi, có lỗi mạng một xíu. Em thử lại nha! 😥");
        }
    } catch (error) {
        alert("Không kết nối được rồi công chúa ơi! 😥");
    } finally {
        // Khôi phục lại nút bấm
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    }
}