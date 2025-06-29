document.addEventListener('DOMContentLoaded', () => {
    // Definisi Pertanyaan dan Skornya
    // Skor: 0 = Sangat Jarang/Tidak Pernah, 1 = Kadang-kadang, 2 = Sering, 3 = Sangat Sering
    const questions = [
        {
            question: "Seberapa sering Anda merasa sulit tidur atau tidur tidak nyenyak dalam sebulan terakhir?",
            answers: [
                { text: "Tidak Pernah", value: 0 },
                { text: "Kadang-kadang", value: 1 },
                { text: "Sering", value: 2 },
                { text: "Hampir Setiap Hari", value: 3 }
            ]
        },
        {
            question: "Seberapa sering Anda merasa lelah atau kekurangan energi tanpa alasan yang jelas?",
            answers: [
                { text: "Sangat Jarang", value: 0 },
                { text: "Beberapa Kali", value: 1 },
                { text: "Cukup Sering", value: 2 },
                { text: "Hampir Selalu", value: 3 }
            ]
        },
        {
            question: "Seberapa sering Anda merasa cemas, gelisah, atau tegang?",
            answers: [
                { text: "Tidak Pernah", value: 0 },
                { text: "Jarang", value: 1 },
                { text: "Sering", value: 2 },
                { text: "Sangat Sering", value: 3 }
            ]
        },
        {
            question: "Seberapa sering Anda merasa sulit berkonsentrasi pada pekerjaan atau tugas?",
            answers: [
                { text: "Sangat Jarang", value: 0 },
                { text: "Kadang-kadang", value: 1 },
                { text: "Sering", value: 2 },
                { text: "Hampir Selalu", value: 3 }
            ]
        },
        {
            question: "Seberapa sering Anda mudah marah atau frustrasi karena hal-hal kecil?",
            answers: [
                { text: "Tidak Pernah", value: 0 },
                { text: "Jarang", value: 1 },
                { text: "Sering", value: 2 },
                { text: "Sangat Sering", value: 3 }
            ]
        },
        {
            question: "Seberapa sering Anda kehilangan minat pada hobi atau aktivitas yang biasanya Anda nikmati?",
            answers: [
                { text: "Tidak Sama Sekali", value: 0 },
                { text: "Kadang-kadang", value: 1 },
                { text: "Seringkali", value: 2 },
                { text: "Hampir Selalu", value: 3 }
            ]
        },
        {
            question: "Seberapa sering Anda mengalami sakit kepala, sakit perut, atau ketegangan otot?",
            answers: [
                { text: "Sangat Jarang", value: 0 },
                { text: "Kadang-kadang", value: 1 },
                { text: "Cukup Sering", value: 2 },
                { text: "Hampir Setiap Hari", value: 3 }
            ]
        },
         {
            question: "Seberapa sering Anda merasa kewalahan dengan tanggung jawab Anda (pekerjaan, keluarga, dll)?",
            answers: [
                { text: "Jarang atau Tidak Pernah", value: 0 },
                { text: "Kadang-kadang", value: 1 },
                { text: "Sering", value: 2 },
                { text: "Hampir Selalu", value: 3 }
            ]
        },
        {
            question: "Seberapa sering Anda merasa pesimis atau putus asa tentang masa depan?",
            answers: [
                { text: "Tidak Pernah", value: 0 },
                { text: "Jarang", value: 1 },
                { text: "Kadang-kadang", value: 2 },
                { text: "Sering", value: 3 }
            ]
        },
        {
            question: "Seberapa sering Anda menggunakan makanan, alkohol, atau rokok untuk mengatasi perasaan tidak nyaman?",
            answers: [
                { text: "Tidak Pernah", value: 0 },
                { text: "Jarang", value: 1 },
                { text: "Kadang-kadang", value: 2 },
                { text: "Sering", value: 3 }
            ]
        }
    ];

    // Variabel state
    let currentQuestionIndex = 0;
    let score = 0;
    let userName = '';
    let userAge = '';
    let userAnswers = []; // Untuk menyimpan jawaban user

    // Elemen DOM
    const userInfoContainer = document.getElementById('userInfoContainer');
    const quizContainer = document.getElementById('quizContainer');
    const resultContainer = document.getElementById('resultContainer');
    const userInfoForm = document.getElementById('userInfoForm');
    const questionText = document.getElementById('questionText');
    const answerOptions = document.getElementById('answerOptions');
    const exportButton = document.getElementById('exportButton');
    const restartButton = document.getElementById('restartButton');
    
    // Progress bar elements
    const currentQuestionNum = document.getElementById('currentQuestionNum');
    const totalQuestionNum = document.getElementById('totalQuestionNum');

    // Event Listener untuk form user
    userInfoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        userName = document.getElementById('name').value;
        userAge = document.getElementById('age').value;
        
        userInfoContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        totalQuestionNum.textContent = questions.length;
        showQuestion();
    });

    // Fungsi untuk menampilkan pertanyaan
    function showQuestion() {
        resetState();
        currentQuestionNum.textContent = currentQuestionIndex + 1;
        const currentQuestion = questions[currentQuestionIndex];
        questionText.innerText = currentQuestion.question;
        
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'btn'; // Menambahkan class untuk styling
            button.innerText = answer.text;
            button.dataset.value = answer.value;
            button.addEventListener('click', selectAnswer);
            answerOptions.appendChild(button);
        });
    }

    // Fungsi untuk membersihkan state sebelum pertanyaan baru
    function resetState() {
        while (answerOptions.firstChild) {
            answerOptions.removeChild(answerOptions.firstChild);
        }
    }

    // Fungsi saat user memilih jawaban
    function selectAnswer(e) {
        const selectedButton = e.target;
        const answerValue = parseInt(selectedButton.dataset.value);
        
        score += answerValue;
        userAnswers.push({
            question: questions[currentQuestionIndex].question,
            answer: selectedButton.innerText,
            value: answerValue
        });

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    // Fungsi untuk menampilkan hasil
    function showResult() {
        quizContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        document.getElementById('resultName').innerText = userName;
        document.getElementById('resultAge').innerText = userAge;
        document.getElementById('score').innerText = score;

        let stressLevelText = '';
        let recommendationText = '';
        const stressLevelEl = document.getElementById('stressLevel');

        if (score <= 7) {
            stressLevelText = "Tingkat Stres: RENDAH";
            recommendationText = "Anda tampaknya dapat mengelola stres dengan baik. Pertahankan gaya hidup sehat, pola tidur yang cukup, dan tetap lakukan aktivitas yang Anda nikmati. Ini adalah fondasi yang bagus untuk kesehatan mental.";
            stressLevelEl.style.backgroundColor = '#d4edda';
            stressLevelEl.style.color = '#155724';
        } else if (score <= 15) {
            stressLevelText = "Tingkat Stres: SEDANG";
            recommendationText = "Anda mengalami beberapa gejala stres. Saatnya untuk lebih peduli pada diri sendiri. Coba identifikasi sumber stres utama Anda dan cari cara untuk menguranginya. Teknik relaksasi seperti meditasi, pernapasan dalam, atau yoga bisa sangat membantu.";
            stressLevelEl.style.backgroundColor = '#fff3cd';
            stressLevelEl.style.color = '#856404';
        } else if (score <= 22) {
            stressLevelText = "Tingkat Stres: TINGGI";
            recommendationText = "Tingkat stres Anda cukup tinggi dan perlu perhatian serius. Prioritaskan waktu untuk istirahat dan relaksasi setiap hari. Jangan ragu untuk berbicara dengan teman, keluarga, atau atasan tentang beban Anda. Pertimbangkan untuk mengurangi beberapa komitmen jika memungkinkan.";
            stressLevelEl.style.backgroundColor = '#f8d7da';
            stressLevelEl.style.color = '#721c24';
        } else {
            stressLevelText = "Tingkat Stres: SANGAT TINGGI";
            recommendationText = "Anda berada di bawah tekanan stres yang sangat signifikan. Sangat disarankan untuk mencari bantuan profesional. Berkonsultasi dengan psikolog atau konselor dapat memberikan Anda alat dan strategi yang efektif untuk mengelola stres dan mencegah dampak negatif pada kesehatan Anda.";
            stressLevelEl.style.backgroundColor = '#dc3545';
            stressLevelEl.style.color = '#ffffff';
        }

        stressLevelEl.innerText = stressLevelText;
        document.getElementById('recommendation').innerText = recommendationText;
    }

    // Event listener untuk tombol download
    exportButton.addEventListener('click', exportToCsv);
    restartButton.addEventListener('click', () => {
        window.location.reload();
    });

    // Fungsi untuk ekspor ke CSV (yang bisa dibuka di Excel)
    function exportToCsv() {
        let csvContent = "data:text/csv;charset=utf-8,";
        
        // Header info
        csvContent += `Laporan Tingkat Stres untuk,${userName}\n`;
        csvContent += `Umur,${userAge}\n\n`;
        
        // Hasil Akhir
        csvContent += `SKOR TOTAL,${score}\n`;
        csvContent += `TINGKAT STRES,${document.getElementById('stressLevel').innerText}\n\n`;
        
        // Header tabel jawaban
        csvContent += "No.,Pertanyaan,Jawaban Anda,Skor Jawaban\n";
        
        // Data jawaban
        userAnswers.forEach((item, index) => {
            // Mengganti koma di dalam pertanyaan agar tidak merusak format CSV
            const question = `"${item.question.replace(/"/g, '""')}"`;
            const answer = `"${item.answer.replace(/"/g, '""')}"`;
            csvContent += `${index + 1},${question},${answer},${item.value}\n`;
        });
        
        // Membuat link untuk download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Laporan_Stres_${userName.replace(/\s+/g, '_')}.csv`);
        document.body.appendChild(link);
        
        link.click();
        document.body.removeChild(link);
    }
});