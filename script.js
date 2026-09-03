// 1. Hàm tạo thông báo đẹp mắt thay cho alert
function showNotification(message) {
    const popup = document.createElement('div');
    popup.innerText = message;
    
    // CSS làm đẹp cho bảng thông báo
    Object.assign(popup.style, {
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(45deg, #ff758c, #ff7eb3)',
        color: 'white',
        padding: '12px 25px',
        borderRadius: '25px',
        boxShadow: '0 10px 20px rgba(255, 117, 140, 0.3)',
        zIndex: '9999',
        fontWeight: 'bold',
        fontSize: '15px',
        opacity: '0',
        transition: 'all 0.4s ease',
        textAlign: 'center',
        minWidth: '250px'
    });

    document.body.appendChild(popup);

    // Hiệu ứng trượt xuống và hiện ra
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.style.top = '40px';
    }, 10);

    // Tự động biến mất sau 3 giây
    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.top = '10px';
        setTimeout(() => popup.remove(), 400);
    }, 3000);
}

// 2. Hàm xử lý khi nhấn Gửi
async function submitOrder(placeName) {
    const checkboxes = document.querySelectorAll('.round-checkbox:checked');
    const note = document.querySelector('.note-input').value;
    const submitBtn = document.querySelector('.submit-btn');
    
    // Kiểm tra chưa chọn món
    if (checkboxes.length === 0 && note.trim() === '') {
        showNotification("Công chúa chưa chọn món nào nè! 🥰");
        return;
    }

    let selectedItems = [];
    checkboxes.forEach(cb => {
        selectedItems.push(cb.value);
    });

    // 🔴 DÁN LINK FORMSPREE CỦA BẠN VÀO ĐÂY 🔴
    const formspreeURL = "https://formspree.io/f/THAY_BANG_LINK_CUA_BAN";

    const orderData = {
        "Địa điểm": placeName,
        "Món đã chọn": selectedItems.join(" + "),
        "Ghi chú": note,
        "Thời gian chọn": new Date().toLocaleString("vi-VN")
    };

    // Đổi chữ trên nút để Tâm biết là đang gửi
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Đang gửi cho anh Dũng... 🚀";
    submitBtn.disabled = true;

    try {
        const response = await fetch(formspreeURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            // ĐÃ THAY ALERT BẰNG THÔNG BÁO XINH XẮN
            showNotification(`Đã gửi thành công lựa chọn ở ${placeName}! 💕`);
            
            // Xóa tick các món sau khi gửi
            checkboxes.forEach(cb => cb.checked = false);
            document.querySelector('.note-input').value = '';
        } else {
            showNotification("Ôi, có lỗi mạng một xíu. Em thử lại nha! 😥");
        }
    } catch (error) {
        showNotification("Không kết nối được rồi công chúa ơi! 😥");
    } finally {
        // Trả lại trạng thái nút bấm ban đầu
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    }
}