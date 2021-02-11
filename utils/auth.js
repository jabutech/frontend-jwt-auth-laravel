// import axios
import axios from 'axios'

// masukkan token ke header untuk memvalidasi halaman yang wajib login
export function setHeaderToken(token){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

// menghapus token ketika tidak diperlukan/logout
export function removeHeaderToken(){
    delete axios.defaults.headers.common['authorization']
}
