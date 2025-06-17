// app.js
document.addEventListener('DOMContentLoaded', function() {
    // تأكد من وجود بيانات المعلمين
    if (typeof teacherData2026 !== 'undefined' && teacherData2026.teachers) {
        setupEventListeners();
        renderSubjects();
    }
    
    // إضافة حدث القائمة المتنقلة
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }
});

// متغيرات عالمية
const PROXY_URL = "https://abwaab-proxy.ss9758026.workers.dev/"; // استبدل برابط البروكسي الخاص بك
let currentHls = null;

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // العودة إلى المواد الدراسية
    document.getElementById('back-to-subjects').addEventListener('click', function() {
        showSection('subjects-section');
    });
    
    // العودة إلى المعلمين
    document.getElementById('back-to-teachers').addEventListener('click', function() {
        showSection('teachers-section');
    });
    
    // العودة إلى الفصول
    document.getElementById('back-to-classes').addEventListener('click', function() {
        showSection('classes-section');
    });
    
    // إغلاق مشغل الفيديو
    document.getElementById('close-video').addEventListener('click', function() {
        closeVideoPlayer();
    });
    
    // البحث
    document.getElementById('search-btn').addEventListener('click', searchContent);
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchContent();
        }
    });
    
    // التنقل
    document.getElementById('nav-teachers').addEventListener('click', function(e) {
        e.preventDefault();
        renderTeachers();
        showSection('teachers-section');
    });
    
    document.getElementById('nav-classes').addEventListener('click', function(e) {
        e.preventDefault();
        renderClasses();
        showSection('classes-section');
    });
}

// إظهار قسم معين وإخفاء الأقسام الأخرى
function showSection(sectionId) {
    const sections = [
        'subjects-section', 
        'teachers-section', 
        'classes-section', 
        'lectures-section',
        'features-section'
    ];
    
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = id === sectionId ? 'block' : 'none';
        }
    });
}

// عرض المواد الدراسية
function renderSubjects() {
    const subjectsContainer = document.getElementById('subjects-container');
    subjectsContainer.innerHTML = '';
    
    // تعريف المواد الدراسية
    const subjects = [
        { 
            name: "الرياضيات", 
            icon: "fas fa-calculator",
            teachers: teacherData2026.teachers.filter(t => t.subject.includes('الرياضيات'))
        },
        { 
            name: "الفيزياء", 
            icon: "fas fa-atom",
            teachers: teacherData2026.teachers.filter(t => t.subject.includes('الفيزياء'))
        },
        { 
            name: "الكيمياء", 
            icon: "fas fa-flask",
            teachers: teacherData2026.teachers.filter(t => t.subject.includes('الكيمياء'))
        },
        { 
            name: "الأحياء", 
            icon: "fas fa-dna",
            teachers: teacherData2026.teachers.filter(t => t.subject.includes('الأحياء'))
        },
        { 
            name: "اللغة العربية", 
            icon: "fas fa-book",
            teachers: teacherData2026.teachers.filter(t => t.subject.includes('اللغة العربية'))
        },
        { 
            name: "اللغة الانكليزية", 
            icon: "fas fa-language",
            teachers: teacherData2026.teachers.filter(t => t.subject.includes('اللغة الانكليزية'))
        }
    ];
    
    // عرض المواد الدراسية
    subjects.forEach(subject => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        subjectCard.innerHTML = `
            <i class="${subject.icon}"></i>
            <h3>${subject.name}</h3>
            <p>${subject.teachers.length} مدرس متخصص</p>
            <div class="teachers-count">${subject.teachers.length} مدرس</div>
        `;
        
        // حدث النقر على المادة الدراسية
        subjectCard.addEventListener('click', function() {
            showTeachersBySubject(subject.name, subject.teachers);
        });
        
        subjectsContainer.appendChild(subjectCard);
    });
}

// عرض جميع المعلمين
function renderTeachers() {
    const teachersContainer = document.getElementById('teachers-container');
    const subjectTitle = document.getElementById('subject-title');
    
    // تحديث العنوان
    subjectTitle.textContent = `جميع المعلمين`;
    
    // إظهار قسم المعلمين وإخفاء الأقسام الأخرى
    showSection('teachers-section');
    
    // مسح المحتوى السابق
    teachersContainer.innerHTML = '';
    
    // عرض المعلمين
    teacherData2026.teachers.forEach(teacher => {
        const teacherCard = document.createElement('div');
        teacherCard.className = 'teacher-card';
        
        teacherCard.innerHTML = `
            <div class="teacher-header">
                <div class="teacher-avatar">
                    <img src="${teacher.image}" alt="${teacher.name}">
                </div>
                <div class="teacher-info">
                    <h3>${teacher.name}</h3>
                    <p>${teacher.subject}</p>
                </div>
            </div>
        `;
        
        // حدث النقر على المعلم
        teacherCard.addEventListener('click', function() {
            showClassesByTeacher(teacher);
        });
        
        teachersContainer.appendChild(teacherCard);
    });
}

// عرض جميع الفصول
function renderClasses() {
    const classesContainer = document.getElementById('classes-container');
    const teacherTitle = document.getElementById('teacher-title');
    
    // تحديث العنوان
    teacherTitle.textContent = `جميع الفصول الدراسية`;
    
    // إظهار قسم الفصول وإخفاء الأقسام الأخرى
    showSection('classes-section');
    
    // مسح المحتوى السابق
    classesContainer.innerHTML = '';
    
    // عرض الفصول
    teacherData2026.teachers.forEach(teacher => {
        teacher.classes.forEach((classItem, index) => {
            const classCard = document.createElement('div');
            classCard.className = 'class-card';
            
            classCard.innerHTML = `
                <i class="fas fa-book-open"></i>
                <h3>${classItem.name}</h3>
                <p>${teacher.name}</p>
                <div class="lectures-count">${classItem.lectures.length} محاضرة</div>
            `;
            
            // حدث النقر على الفصل
            classCard.addEventListener('click', function() {
                showLecturesByClass(teacher, classItem, index);
            });
            
            classesContainer.appendChild(classCard);
        });
    });
}

// عرض المعلمين حسب المادة الدراسية
function showTeachersBySubject(subjectName, teachers) {
    const teachersContainer = document.getElementById('teachers-container');
    const subjectTitle = document.getElementById('subject-title');
    
    // تحديث العنوان
    subjectTitle.textContent = `معلمو مادة ${subjectName}`;
    
    // إظهار قسم المعلمين وإخفاء الأقسام الأخرى
    showSection('teachers-section');
    
    // مسح المحتوى السابق
    teachersContainer.innerHTML = '';
    
    // عرض المعلمين
    teachers.forEach(teacher => {
        const teacherCard = document.createElement('div');
        teacherCard.className = 'teacher-card';
        
        teacherCard.innerHTML = `
            <div class="teacher-header">
                <div class="teacher-avatar">
                    <img src="${teacher.image}" alt="${teacher.name}">
                </div>
                <div class="teacher-info">
                    <h3>${teacher.name}</h3>
                    <p>${teacher.subject}</p>
                </div>
            </div>
        `;
        
        // حدث النقر على المعلم
        teacherCard.addEventListener('click', function() {
            showClassesByTeacher(teacher);
        });
        
        teachersContainer.appendChild(teacherCard);
    });
}

// عرض الفصول الدراسية حسب المعلم
function showClassesByTeacher(teacher) {
    const classesContainer = document.getElementById('classes-container');
    const teacherTitle = document.getElementById('teacher-title');
    
    // تحديث العنوان
    teacherTitle.textContent = `فصول الأستاذ ${teacher.name}`;
    
    // إظهار قسم الفصول وإخفاء الأقسام الأخرى
    showSection('classes-section');
    
    // مسح المحتوى السابق
    classesContainer.innerHTML = '';
    
    // عرض الفصول
    teacher.classes.forEach((classItem, index) => {
        const classCard = document.createElement('div');
        classCard.className = 'class-card';
        
        classCard.innerHTML = `
            <i class="fas fa-book-open"></i>
            <h3>${classItem.name}</h3>
            <div class="lectures-count">${classItem.lectures.length} محاضرة</div>
        `;
        
        // حدث النقر على الفصل
        classCard.addEventListener('click', function() {
            showLecturesByClass(teacher, classItem, index);
        });
        
        classesContainer.appendChild(classCard);
    });
}

// عرض المحاضرات حسب الفصل
function showLecturesByClass(teacher, classItem, classIndex) {
    const lecturesContainer = document.getElementById('lectures-container');
    const classTitle = document.getElementById('class-title');
    
    // تحديث العنوان
    classTitle.textContent = `المحاضرات - ${classItem.name}`;
    
    // إظهار قسم المحاضرات وإخفاء الأقسام الأخرى
    showSection('lectures-section');
    
    // مسح المحتوى السابق
    lecturesContainer.innerHTML = '';
    
    // عرض المحاضرات
    classItem.lectures.forEach(lecture => {
        const lectureCard = document.createElement('div');
        lectureCard.className = 'lecture-card';
        
        lectureCard.innerHTML = `
            <div class="lecture-thumb">
                <i class="fas fa-play-circle"></i>
            </div>
            <div class="lecture-content">
                <h3 class="lecture-title">${lecture.title}</h3>
                <div class="lecture-meta">
                    <div class="lecture-duration">
                        <i class="fas fa-clock"></i>
                        <span>${lecture.duration || 'غير محدد'}</span>
                    </div>
                </div>
                <button class="watch-btn" data-url="${lecture.url}" data-title="${lecture.title}">
                    <i class="fas fa-play"></i> مشاهدة المحاضرة
                </button>
            </div>
        `;
        
        // حدث النقر على مشاهدة المحاضرة
        const watchBtn = lectureCard.querySelector('.watch-btn');
        watchBtn.addEventListener('click', function() {
            playLecture(this.dataset.url, this.dataset.title);
        });
        
        lecturesContainer.appendChild(lectureCard);
    });
}

// تشغيل المحاضرة باستخدام البروكسي
function playLecture(url, title) {
    const videoModal = document.getElementById('video-modal');
    const videoPlayerContainer = document.getElementById('video-player');
    const videoTitle = document.getElementById('video-title');
    
    videoTitle.textContent = title;
    videoModal.classList.add('active');
    
    // تدمير مشغل HLS السابق
    if (currentHls) {
        currentHls.destroy();
        currentHls = null;
    }
    
    // مسح المحتوى السابق
    videoPlayerContainer.innerHTML = '';
    
    // إنشاء عناصر مشغل الفيديو الجديد
    const videoElement = document.createElement('video');
    videoElement.id = 'player';
    videoElement.playsinline = true;
    
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'video-loading';
    loadingIndicator.textContent = 'جاري التحميل...';
    
    videoPlayerContainer.appendChild(videoElement);
    videoPlayerContainer.appendChild(loadingIndicator);
    
    // إعداد مشغل الفيديو
    const proxyUrl = `${PROXY_URL}?url=${encodeURIComponent(url)}`;
    
    // إنشاء مشغل HLS
    if (Hls.isSupported()) {
        currentHls = new Hls({
            debug: false,
            enableWorker: true,
            backBufferLength: 90,
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
            maxBufferSize: 60 * 1000 * 1000,
            manifestLoadingMaxRetry: 5,
            levelLoadingMaxRetry: 5,
            fragLoadingMaxRetry: 5,
        });
        
        currentHls.loadSource(proxyUrl);
        currentHls.attachMedia(videoElement);
        
        currentHls.on(Hls.Events.MANIFEST_PARSED, function() {
            // تهيئة Plyr بعد تحميل الفيديو
            const player = new Plyr(videoElement, {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
                settings: ['quality', 'speed'],
                speed: {
                    selected: 1,
                    options: [0.5, 0.75, 1, 1.25, 1.5, 2]
                },
                quality: {
                    default: 0,
                    options: getQualityOptions(currentHls.levels),
                    forced: true,
                    onChange: (quality) => updateQuality(quality, currentHls)
                },
                i18n: {
                    qualityLabel: {
                        0: 'تلقائي'
                    }
                }
            });
            
            // إخفاء رسالة التحميل
            loadingIndicator.style.display = 'none';
            
            // محاولة التشغيل التلقائي
            player.play().catch(e => {
                console.log('التشغيل التلقائي فشل:', e);
            });
        });
        
        currentHls.on(Hls.Events.ERROR, function(event, data) {
            console.error('HLS error:', data);
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.error('Network error, trying to recover');
                        currentHls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.error('Media error, trying to recover');
                        currentHls.recoverMediaError();
                        break;
                    default:
                        console.error('Fatal error, cannot recover');
                        showVideoError('تعذر تحميل الفيديو. يرجى المحاولة لاحقاً');
                        break;
                }
            }
        });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // دعم Safari الأصلي
        videoElement.src = proxyUrl;
        videoElement.addEventListener('loadedmetadata', function() {
            const player = new Plyr(videoElement);
            loadingIndicator.style.display = 'none';
            player.play().catch(console.error);
        });
    } else {
        showVideoError('عذرًا، متصفحك لا يدعم تشغيل هذا النوع من الفيديوهات');
    }
}

// الحصول على خيارات الجودة
function getQualityOptions(levels) {
    if (!levels || levels.length === 0) return [0];
    
    const options = [0]; // تلقائي
    levels.forEach(level => {
        if (level.height && !options.includes(level.height)) {
            options.push(level.height);
        }
    });
    
    return options.sort((a, b) => b - a); // تنازلي
}

// تحديث الجودة
function updateQuality(quality, hls) {
    if (quality === 0) {
        hls.currentLevel = -1; // الجودة التلقائية
    } else {
        const level = hls.levels.findIndex(l => l.height === quality);
        if (level !== -1) hls.currentLevel = level;
    }
}

// إغلاق مشغل الفيديو
function closeVideoPlayer() {
    const videoModal = document.getElementById('video-modal');
    const videoPlayerContainer = document.getElementById('video-player');
    
    videoModal.classList.remove('active');
    
    // تدمير مشغل HLS عند الإغلاق
    if (currentHls) {
        currentHls.destroy();
        currentHls = null;
    }
    
    // مسح محتوى مشغل الفيديو
    videoPlayerContainer.innerHTML = '';
}

// وظيفة البحث
function searchContent() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    if (!searchTerm) return;
    
    // جمع نتائج البحث
    const results = {
        teachers: [],
        classes: [],
        lectures: []
    };
    
    // البحث في المعلمين
    teacherData2026.teachers.forEach(teacher => {
        if (teacher.name.toLowerCase().includes(searchTerm) || 
            teacher.subject.toLowerCase().includes(searchTerm)) {
            results.teachers.push(teacher);
        }
        
        // البحث في الفصول
        teacher.classes.forEach(classItem => {
            if (classItem.name.toLowerCase().includes(searchTerm)) {
                results.classes.push({
                    teacher,
                    classItem
                });
            }
            
            // البحث في المحاضرات
            classItem.lectures.forEach(lecture => {
                if (lecture.title.toLowerCase().includes(searchTerm) || 
                    (lecture.description && lecture.description.toLowerCase().includes(searchTerm))) {
                    results.lectures.push({
                        teacher,
                        classItem,
                        lecture
                    });
                }
            });
        });
    });
    
    // عرض نتائج البحث
    displaySearchResults(results);
}

// عرض نتائج البحث
function displaySearchResults(results) {
    // إظهار قسم المعلمين وإخفاء الأقسام الأخرى
    showSection('teachers-section');
    
    const teachersContainer = document.getElementById('teachers-container');
    const subjectTitle = document.getElementById('subject-title');
    
    // تحديث العنوان
    subjectTitle.textContent = `نتائج البحث`;
    
    // مسح المحتوى السابق
    teachersContainer.innerHTML = '';
    
    // عرض نتائج البحث
    if (results.teachers.length > 0) {
        const heading = document.createElement('h3');
        heading.textContent = 'المعلمون:';
        heading.style.margin = '20px 0';
        heading.style.color = 'var(--primary)';
        teachersContainer.appendChild(heading);
        
        results.teachers.forEach(teacher => {
            const teacherCard = document.createElement('div');
            teacherCard.className = 'teacher-card';
            
            teacherCard.innerHTML = `
                <div class="teacher-header">
                    <div class="teacher-avatar">
                        <img src="${teacher.image}" alt="${teacher.name}">
                    </div>
                    <div class="teacher-info">
                        <h3>${teacher.name}</h3>
                        <p>${teacher.subject}</p>
                    </div>
                </div>
            `;
            
            teachersContainer.appendChild(teacherCard);
        });
    }
    
    if (results.classes.length > 0) {
        const heading = document.createElement('h3');
        heading.textContent = 'الفصول الدراسية:';
        heading.style.margin = '20px 0';
        heading.style.color = 'var(--primary)';
        teachersContainer.appendChild(heading);
        
        results.classes.forEach(result => {
            const classCard = document.createElement('div');
            classCard.className = 'class-card';
            
            classCard.innerHTML = `
                <i class="fas fa-book-open"></i>
                <h3>${result.classItem.name}</h3>
                <p>${result.teacher.name}</p>
                <div class="lectures-count">${result.classItem.lectures.length} محاضرة</div>
            `;
            
            teachersContainer.appendChild(classCard);
        });
    }
    
    if (results.lectures.length > 0) {
        const heading = document.createElement('h3');
        heading.textContent = 'المحاضرات:';
        heading.style.margin = '20px 0';
        heading.style.color = 'var(--primary)';
        teachersContainer.appendChild(heading);
        
        results.lectures.forEach(result => {
            const lectureCard = document.createElement('div');
            lectureCard.className = 'lecture-card';
            
            lectureCard.innerHTML = `
                <div class="lecture-thumb">
                    <i class="fas fa-play-circle"></i>
                </div>
                <div class="lecture-content">
                    <h3 class="lecture-title">${result.lecture.title}</h3>
                    <div class="lecture-meta">
                        <div class="lecture-duration">
                            <i class="fas fa-clock"></i>
                            <span>${result.lecture.duration || 'غير محدد'}</span>
                        </div>
                    </div>
                    <button class="watch-btn" data-url="${result.lecture.url}" data-title="${result.lecture.title}">
                        <i class="fas fa-play"></i> مشاهدة المحاضرة
                    </button>
                </div>
            `;
            
            const watchBtn = lectureCard.querySelector('.watch-btn');
            watchBtn.addEventListener('click', function() {
                playLecture(this.dataset.url, this.dataset.title);
            });
            
            teachersContainer.appendChild(lectureCard);
        });
    }
    
    if (results.teachers.length === 0 && results.classes.length === 0 && results.lectures.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px;"></i>
            <h3>لا توجد نتائج</h3>
            <p>لم نعثر على أي نتائج تطابق بحثك</p>
        `;
        teachersContainer.appendChild(noResults);
    }
}

// تبديل القائمة المتنقلة
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// عرض خطأ في مشغل الفيديو
function showVideoError(message) {
    const videoPlayerContainer = document.getElementById('video-player');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    videoPlayerContainer.appendChild(errorMessage);
}
