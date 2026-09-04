import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Faculty {
  id: number;
  name: string;
  qualificationTitle: string;
  designation: string;
  additionalDesignation?: string;
  department: string;
  email: string;
  image: string;

  qualification: string[];
  specialization: string[];

  books: string[];
  research: string[];

  articles?: string[];
  journals?: string[];
}

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
})
export class FacultyComponent {
  selectedFaculty: Faculty | null = null;

  facultyList: Faculty[] = [
    // =========================================================
    // OLD TESTAMENT
    // =========================================================

    {
      id: 1,
      name: 'Dr. Nyimangyang Chang',
      qualificationTitle: 'B.TH, BD, M.Th, D.Th',
      designation: 'Associate Professor & Dean, Old Testament',
      additionalDesignation: 'Dean of Doctoral Studies',
      department: 'Biblical Studies: Old Testament',
      email: 'nyimang@ubs.ac.in',
      image: '../../../assets/faculty/image_1.png',

      qualification: [
        'D. Th - Senate of Serampore – 2017',
        'M. Th – Senate of Serampore – 2010',
        'BD – Senate of Serampore – 2000',
        'B.TH – Senate of Serampore – 1997',
      ],

      specialization: [
        'Hebrew Bible',
        'Ancient West Asia',
        'History of Ancient Israel',
      ],

      books: [
        'Women’s Inheritance Law in the Old Testament. New Delhi: CWC, 2020.',
        'Prophetic Movement with Special Reference to Isaiah 40-55. Kolkata: SCEPTRE, Shrachi Centre, 2023.',
      ],

      research: [],
    },

    {
      id: 2,
      name: 'Dr. Soren Odyuo',
      qualificationTitle: 'B.D, M.Th, D.Th',
      designation: 'Assistant Professor, Old Testament',
      additionalDesignation: 'Director of Worship Life',
      department: 'Biblical Studies: Old Testament',
      email: 'sorenodyuo@ubs.ac.in',
      image: '../../../assets/faculty/image_2.png',

      qualification: [
        'DTh - United Theological College - 2024',
        'MTh - United Theological College - 2017',
        'BD - Baptist Theological College - 2014',
      ],

      specialization: ['Prophetic Literature'],

      books: [
        'Oracles Against the nations in Proto-Isaiah. New Delhi: CWI, 2026.',
      ],

      articles: [
        '"Analysis of the Concept of Ger in Deuteronomy and Exodus," UBS Journal 18/1 (March, 2024)',
        '"Social Exclusion of dalits and Tribals in India: A Reflection from the Prophetic book of Isaiah," UBS Journal 19/1 (April, 2026)',
      ],

      research: ['Prophetical Books and Wisdom Literatures'],
    },

    {
      id: 3,
      name: 'Rev. Majesty Richard Das',
      qualificationTitle: 'B.D, M.Th',
      designation: 'Lecturer, Old Testament',
      additionalDesignation: 'Director, UBS Touring Choir',
      department: 'Biblical Studies: Old Testament',
      email: 'majesty@ubs.ac.in',
      image: '../../../assets/faculty/image_3.png',

      qualification: [
        'M.Th - Senate of Serampore - 2022',
        'B.D - Senate of Serampore - 2019',
      ],

      specialization: [],

      books: [],

      research: [
        'Postcolonial Reading on Hosea',
        'Exilic and Post-Exilic Israelite history',
      ],
    },

    // =========================================================
    // NEW TESTAMENT
    // =========================================================

    {
      id: 4,
      name: 'Dr. Lanuwabang Jamir',
      qualificationTitle: 'PhD',
      designation: 'Associate Professor, New Testament',
      additionalDesignation: 'Dean, New Testament',
      department: 'Biblical Studies: New Testament',
      email: 'lanu@ubs.ac.in',
      image: '../../../assets/faculty/image_4.png',

      qualification: ['PhD - MiddleSex University, 2012'],

      specialization: ['Pauline Studies'],

      books: [
        'Exclusion and Judgement in Fellowship Meals: The Socio-Historical Background of 1 Corinthians 11:17-34',
      ],

      research: [],
    },

    {
      id: 5,
      name: 'Rev. Dr. J. Stanly Jones',
      qualificationTitle: 'B.Th, B.D, M.A, M.Th, D.Th',
      designation: 'Associate Professor, New Testament',
      additionalDesignation: 'Dean, Distance Learning Program',
      department: 'Biblical Studies: New Testament',
      email: 'stanlyjones@ubs.ac.in',
      image: '../../../assets/faculty/image_5.png',

      qualification: [
        'D.Th – Senate of Serampore – 2016',
        'M.Th – Senate of Serampore – 2005',
        'BD – Senate of Serampore – 2002',
      ],

      specialization: [
        'Synoptic Gospels (Gospel of Mark) – The Healing Narratives as Resistance Literature',
        'Pauline Letters and the Connection of Paul and Jesus',
        'Gospels and Epistles',
      ],

      books: [
        'A Study of Pauline Interpretation of Jesus’ Ethical Sayings in Q and its Significance in Today’s Indian Context. New Delhi: ISPCK, 2007.',
        'The Jesus Movement and its Resistance to Oppressive Institutions: A Study of Healing Narratives in Mark’s Gospel. ISPCK, 2020.',
      ],

      research: [
        'A Study of Pauline Interpretation of Jesus’ Ethical Sayings in Q and its Significance in Today’s Indian Context. New Delhi: ISPCK, 2007.',
        'The Jesus Movement and its Resistance to Oppressive Institutions: A Study of Healing Narratives in Mark’s Gospel. ISPCK, 2020.',
      ],
    },

    {
      id: 6,
      name: 'Mr. Abel Abraham Cheriyan',
      qualificationTitle: 'B.E, B.D, M.Th',
      designation: 'Registrar, UBS',
      additionalDesignation: 'Faculty-in-Training, New Testament',
      department: 'Biblical Studies: New Testament',
      email: 'abel.cheriyan@ubs.ac.in',
      image: '../../../assets/faculty/image_6.png',

      qualification: [
        'M.Th – Senate of Serampore – 2025',
        'B.D – Senate of Serampore – 2020',
        'B.E – Anna University – 2011',
      ],

      specialization: ['The New Perspective on Paul', 'Colossians 2:11-15'],

      books: [],

      research: ['Pauline Understanding of Law and Grace'],
    },

    // =========================================================
    // CHRISTIAN THEOLOGY
    // =========================================================

    {
      id: 7,
      name: 'Dr. W.S. Annie',
      qualificationTitle: 'B.D, M.Th, D.Th',
      designation: 'Principal, UBS',
      additionalDesignation: '',
      department: 'Christian Theology',
      email: 'principal@ubs.ac.in',
      image: '../../../assets/faculty/image_7.png',

      qualification: [
        'B.D., Gurukul Lutheran Theological Seminary, Chennai. 1992-94',
        'M.Th., Gurukul Lutheran Theological Seminary, Chennai. 1994-96',
        'D. Th. (2005) Federated Faculty of Research in Religion and Culture. Kottayam.',
      ],

      specialization: [
        'Methodological Issues in Christian Theology',
        'Feminist / Womanist Theology',
        'Creation',
        'Christology',
        'Human Sexuality',
        'Study of Text – Buddha and His Dhamma',
        'Major Figures in Indian Christian Thought',
      ],

      books: [
        'Annie, W. S., Globalization and Women’s Subsistence Labour: A Third World Theological Perspective (Bangalore: BTESSC / SATHRI, 2009). 165 pp.',
        'Fostering Faith and Struggle: A Christian Feminist Musings (Serampore: BTESSC / SATHRI, 2023). 174 pp.',
      ],

      articles: [
        'Annie, W. S., Nandanar: A Dalit Martyr in Joseph Patmury (ed), Doing Theology with the Poetic Traditions of India.',
        'Methodological Issues in Feminist Theology in Wati Longchar (ed), Methodological Issues in Theological Research.',
        'Environmental Spirituality in Religion, Spirituality in Multi-Religious India.',
        'Kingdom of God: A Fearless Space of Being Female.',
        'Migration: A Gender Perspective.',
        'Gender in India and Elsewhere.',
        'A Feminist Reading of Christian Identity and Human Rights Violations in Contemporary India.',
        'Barren Couples Towards Inclusive Community and Spirituality.',
        'Easy Target or a Person - Widows and Single Women in India.',
      ],

      journals: [
        'Children and Violence: A Christian Response, Union Biblical Seminary Journal, Volume 17.1, March 2023.',
        'Honour Killing/Casteism: Female Sexuality: A Dangerous Nexus, Union Biblical Seminary Journal, Volume 16.1, July 2022.',
        'Covid 19 Pandemic as a Time of Discernment, Union Biblical Seminary Journal, Volume 15.1, July 2021.',
        'Female body and Purity-Pollution Taboos: A Christian Response, Union Biblical Seminary Journal, Volume 14.1, March 2020.',
        'Honour Killings and Female Sexuality: A Dangerous Nexus, In God’s Image, Vol. 35, No: 2, December 2016.',
        'Globalization and Women: A Christian Response, Revive, Vol. 07, No: 9, Sep 2014.',
        'Privileging Ritual Purity – Pollution as a Means of Salvation and Life in Gurukul Journal of Theological Studies, Vol. XXIV, 2013.',
        'Women, Media and Globalization in Kerala Theological Journal, Vol 5, No.1, February 2013.',
        'Education and Transformation in COTR Theological Journal, Vol 1, No.1 January 2012.',
        'Women as Agents of Transformation in Ecumenical Horizon, Vol 4, No.7, March 2010.',
        'Women and Space in Ecumenical Horizon, Vol 3, No.2, March 2009.',
        'Chengara: A case study in Ecumenical Horizon, Vol 2, No.4, March 2008.',
        'Feminist Theology in Church and Society in Ecumenical Horizon, Vol 1, No.7, March 2007.',
      ],

      research: [],
    },

    {
      id: 8,
      name: 'Dr. Maisuangdibou',
      qualificationTitle: 'B.A, M.A, B.D, M.Th, D.Th',
      designation: 'Vice Principal, UBS',
      additionalDesignation:
        'Associate Professor & Dean, Christian Theology\nDean of Post-Graduate Studies',
      department: 'Christian Theology',
      email: 'maisong@ubs.ac.in',
      image: '../../../assets/faculty/image_8.png',

      qualification: [
        'D. Th - Senate of Serampore – 2020',
        'M. Th – Senate of Serampore – 2012',
        'BD – Senate of Serampore – 2009',
        'M.A – English (UGC-NET) & Philosophy (UGC-NET)',
        'B.A – Delhi University - 2004',
      ],

      specialization: [
        'Systematic Theology',
        'Biblical Theology',
        'Dogmas and Doctrines',
        'Evangelical Theology',
        'Ethics',
        'Hermeneutics',
        'Postmodern Theology',
        'Subaltern Theology',
        'Tribal Theology',
        'Tribal Literature and Criticism',
      ],

      books: [
        'Tribal Theological Hermeneutics (ISPCK)',
        'Liangmai and Christianity (Witinglung Publication)',
        'Liangmai Narratives (Winco Books)',
        'Tribal Literature, Theology and Methodology (CWI)',
        'Biblical Hermeneutics (CWI)',
      ],

      research: [
        'Systematic Theology',
        'Biblical Theology',
        'Doctrines',
        'Evangelical Theology',
        'Hermeneutics',
        'Subaltern/Tribal Theologies',
        'Tribal Literature',
        'Aesthetics and Criticism',
      ],
    },

    // =========================================================
    // HISTORY OF CHRISTIANITY
    // =========================================================

    {
      id: 9,
      name: 'Dr. L. Bimol',
      qualificationTitle: 'B.Th, B.D, M.Th, D.Th',
      designation: 'Dean, History of Christianity',
      additionalDesignation: 'Director, Research & Publication',
      department: 'History of Christianity',
      email: 'bimol@ubs.ac.in',
      image: '../../../assets/faculty/image_9.png',

      qualification: [
        'Doctor of Theology - TTS/Senate of Serampore',
        'Master of Theology- ETC/Senate of Serampore',
        'Certificate in Missiology - ETC',
        'Bachelor of Divinity - ETC/Senate of Serampore',
        'Bachelor of Theology - ETC/Senate of Serampore',
      ],

      specialization: [],

      books: [],

      research: [],
    },

    {
      id: 10,
      name: 'Dr. Rinchamliana',
      qualificationTitle: 'B.A, BD, M.Th, D.Th',
      designation: 'Assistant Professor, History of Christianity',
      additionalDesignation: 'Director, Practical Training Department',
      department: 'History of Christianity',
      email: 'rincham@ubs.ac.in',
      image: '../../../assets/faculty/image_10.png',

      qualification: [
        'D. Th - Senate of Serampore – 2023',
        'M. Th – Senate of Serampore – 2010',
        'BD – Senate of Serampore – 2006',
        'B.A – Delhi University - 2000',
      ],

      specialization: ['Ecumenism and Tribal History'],

      books: [],

      research: ['Ecumenical Movement and Church Relations'],
    },

    // =========================================================
    // CHRISTIAN MINISTRY
    // =========================================================

    {
      id: 11,
      name: 'Dr. Saju Nirappil Y',
      qualificationTitle: '',
      designation: 'Christian Ministry',
      department: 'Christian Ministry',
      email: 'sajnirappil@gmail.com',
      image: '../../../assets/faculty/image_11.png',

      qualification: [],
      specialization: [],
      books: [],
      research: [],
    },

    {
      id: 12,
      name: 'Mrs. Julie Lavanya',
      qualificationTitle: 'B.Th, B.D, M.Th, (D.Th)',
      designation: 'Lecturer, Christian Ministry',
      additionalDesignation: 'Dean, Christian Ministry',
      department: 'Christian Ministry',
      email: 'juliejones@ubs.ac.in',
      image: '../../../assets/faculty/image_12.png',

      qualification: [
        'M.Th – Senate of Serampore – 2014',
        'B.D – Senate of Serampore – 2005',
        'B.Th – Senate of Serampore – 2002',
      ],

      specialization: [
        'Pastoral Care and Counselling',
        'Positive Mental Health of Employed Married Women',
      ],

      books: [],

      research: [
        'Marriage and Family Counselling',
        'Midlife Crisis and Resilience among Working Women',
      ],
    },

    // =========================================================
    // MISSIOLOGY
    // =========================================================

    {
      id: 13,
      name: 'Mr. Sungjemmeren Kijong Imchen',
      qualificationTitle: 'B.Sc, B.D, M.Th',
      designation: 'Lecturer, Missiology',
      additionalDesignation: 'Faculty In-charge of Library',
      department: 'Missiology',
      email: 'ksimchen@ubs.ac.in',
      image: '../../../assets/faculty/image_13.png',

      qualification: [
        'M.Th – Union Biblical Seminary, Senate of Serampore – 2011',
        'BD – Gospel for Asia Biblical Seminary, Senate of Serampore – 2004',
        'B.Sc – Kohima Science College, Nagaland University - 1999',
      ],

      specialization: ['Missiology'],

      books: [
        'Contemporary Religious Movements in India (2011).',
        'Issues in Contemporary Christian Mission for BD/BCS SCEPTRE, Kolkata (2013).',
        'Church History (2016).',
        'Global Missiological Perspectives (2017).',
        'Mongchen Baptist Arogo Youth Department Platinum Jubilee Souvenir. 2007.',
        'Becoming a Missional Congregation in the 21st Century Indian Context. ISPCK, 2016.',
        'Witnessing Christ in Diverse Contexts. ISPCK, 2019.',
        'Mission and the Emerging Middle Class. ISPCK, 2020.',
      ],

      articles: [
        'Affirming Life Amidst Globalization: Ecumenical and Evangelical Mission Convictions.',
        'Why Missions? Reconsidering a Traditional and Pragmatic yet Neglected Duty of Christians.',
        'Quantitation in Protestant Christian Literatures since Carey’s Enquiry (1792) and Indian Christian Population.',
        'Carey’s Notion of Conversion of the Heathens in the Light of India’s Right-Wing Intellectuals.',
        'The Great Commission and its Relevance for Indian Missiology.',
        'Mission Challenges amidst the Pandemic.',
      ],

      research: [
        'Indian missiology',
        'Mission studies methodology',
        'Missiological curriculum',
        'Missiological education',
        'History of Christianity',
        'Theory & practice of mission',
        'Congregational studies',
        'Indian megachurches',
        'Urban churches',
      ],
    },
  ];

  /** Return the unique departments used to group faculty members. */
  getDepartments(): string[] {
    return [...new Set(this.facultyList.map((faculty) => faculty.department))];
  }

  /** Return faculty members belonging to the requested department. */
  getFacultyByDepartment(department: string): Faculty[] {
    return this.facultyList.filter(
      (faculty) => faculty.department === department,
    );
  }

  /** Open the selected faculty profile and lock the page behind the modal. */
  openFaculty(faculty: Faculty): void {
    this.selectedFaculty = faculty;

    document.body.classList.add('faculty-modal-open');
  }

  /** Close the faculty profile modal and restore page scrolling. */
  closeFaculty(): void {
    this.selectedFaculty = null;

    document.body.classList.remove('faculty-modal-open');
  }

  /** Keep clicks inside the modal from closing it through the backdrop. */
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  /** Replace an unavailable faculty image with the default portrait. */
  imageError(event: Event): void {
    const imageElement = event.target as HTMLImageElement;

    imageElement.src = 'assets/images/faculty/default-faculty.jpg';
  }
}
