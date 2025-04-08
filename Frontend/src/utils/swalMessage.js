import Swal from 'sweetalert2'

const showPopUp=(message,type)=>{
    Swal.fire({
        html: `
        <div class='swal-div-content'>
            <p class="sweet-alert-msg">${message}</p>
        </div>
        `,
        icon: `${type}`,
        confirmButtonText: "OK",
        customClass: {
            popup: 'custom-popup',
            confirmButton: 'custom-confirm-button'
        }
    });
}

export default showPopUp;