const AUDIO_PATHS = [
    // File BGM yang disebutkan
    'BGM.wav', 
    // File taunt dari AnimationsTexts di loadJson.json
    'CH0295_MemorialLobby_1_1.wav',
    'CH0295_MemorialLobby_1_2.wav',
    'CH0295_MemorialLobby_2_1.wav',
    'CH0295_MemorialLobby_2_2.wav',
    'CH0295_MemorialLobby_3_1.wav',
    'CH0295_MemorialLobby_3_2.wav',
    'CH0295_MemorialLobby_4_1.wav',
    'CH0295_MemorialLobby_4_2.wav',
    'CH0295_MemorialLobby_5_1.wav',
    'CH0295_MemorialLobby_5_2.wav',
    'CH0295_MemorialLobby_5_3.wav',
    
    // Note: semua nama file audio taunt diatas berasal dari loadJson.json, dan lokasi file sudah benar
    // (tanpa subdir sound/)
];

let filesLoaded = 0;
const totalFiles = AUDIO_PATHS.length;

/**
 * Fungsi untuk melakukan pre-caching file audio dengan logging verbose.
 * Memanfaatkan event oncanplaythrough untuk menandai keberhasilan load.
 */
function precacheAudioFiles() {
    console.log(`[Precache Audio] Memulai pre-caching ${totalFiles} file audio...`);
    
    AUDIO_PATHS.forEach(path => {
        const audio = new Audio();
        
        // Memastikan browser mencoba mengunduh seluruh file audio.
        audio.preload = 'auto'; 
        audio.src = path;
        
        // Log keberhasilan
        audio.oncanplaythrough = () => {
            console.log(`[Precache Audio] BERHASIL dimuat: ${path}`);
            audio.oncanplaythrough = null; // Hapus listener untuk menghindari double-count
            audio.onerror = null;         // Hapus listener error juga
            
            filesLoaded++;
            checkCompletion();
        };

        // Log kegagalan
        audio.onerror = (e) => {
            console.error(`[Precache Audio] GAGAL memuat audio: ${path}`, e);
            audio.oncanplaythrough = null; // Hapus listener keberhasilan
            audio.onerror = null;         // Hapus listener error juga
            
            filesLoaded++;
            checkCompletion();
        };

        // Memulai proses pengunduhan.
        audio.load();
    });
}

function checkCompletion() {
    if (filesLoaded === totalFiles) {
        console.log(`[Precache Audio] Selesai: ${filesLoaded} dari ${totalFiles} file diproses.`);
    }
}

// Jalankan fungsi precache setelah DOM siap.
window.addEventListener('load', precacheAudioFiles);