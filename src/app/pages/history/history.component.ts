import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    OnDestroy
} from '@angular/core';
import { RouterModule } from '@angular/router';

interface HistoryTimeline {
    number: string;
    year: string;
    title: string;
    description: string;
    image: string;
}

interface HistoryGallery {
    title: string;
    subtitle: string;
    year?: string;
    image: string;
    large?: boolean;
}

@Component({
    selector: 'app-history',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements AfterViewInit, OnDestroy {

    /* =========================================================
       MAIN HISTORY TIMELINE
    ========================================================= */

    historyTimeline: HistoryTimeline[] = [

        {
            number: '01',
            year: '1953–1964',
            title: 'Establishing UBS: The Vision of Frank J. Kline',
            description:
                'Dr. Kline was a visionary. His vision was to promote the evangelical Calvo-Armenian theology, academic integrity, an inter denominational as well as an international atmosphere by setting up a bibliocentric curriculum. His missionary partners endorsed and supported this vision. He realized the vision by enthusiastically advocating it among the missionaries and encouraging their participation whenever he had opportunity to meet them either in conferences or even informally around dinner tables. As an embodiment of dedication and service, he merged his identity with the establishment and improvement of the seminary.',
            image: '../../../../assets/history/image_1.png'
        },

        {
            number: '02',
            year: '1964–1972',
            title: 'Consolidating the Emphases: The Hess and Bauman Years',
            description:
                'After the initial phase of origin and growth, the Seminary needed sufficient time for consolidation, a period of assessment and evaluation, and of utilizing resources. Such a period occurred between 1964 and 1972 when Dr. W. Robert Hess and Rev. Kenneth Bauman served as Principals and when steps were taken to prepare for the great advances of the mid-1970s and 1980s under an Indian Principal.',
            image: '../../../../assets/history/image_2.png'
        },

        {
            number: '03',
            year: '1972–1987',
            title: 'Expanding the Curriculum: The Athyal Dream',
            description:
                "When Dr. Saphir Athyal became the Principal on June 1, 1972, the pace of theological education at UBS began to quicken. He initiated a possible place to relocate the Seminary to a cosmopolitan centre and projected post-graduate courses as well as affiliation with the Senate of Serampore College. At the heart of all the academic endeavours-faculty development, affiliation with Serampore, curriculum planning and revision, and library expansion the central aim of UBS remained constant: to train Christ's servant-leaders and to send them out with a clear vision and with a sense of urgency for Christ's mission in the world today.",
            image: '../../../../assets/history/image_3.png'
        },

        {
            number: '04',
            year: '1983–1987',
            title: 'A New Beginning in Pune: Broadening the Ministry',
            description:
                "In the annals of UBS history 1983 will be remembered as 'the year of the move.' After 30 years in a small town, Yeotmal, removed from the mainstream of life both in the church and society, UBS is entering a new and exciting phase of its history at its new location. These words of Dr. Athyal in his annual report in 1984 describes the realization of relocation in the urban area, Pune, that had been almost twelve years in the making.",
            image: '../../../../assets/history/image_4.png'
        },

        {
            number: '05',
            year: '1987–1994',
            title: 'Broadening the Ministry: The Wintle Era',
            description:
                'When Dr. Brian Wintle became the fifth Principal of UBS in June 1987, the Seminary was in the process of revising the major academic programmes considerably. In his letters to prayer partners and friends of UBS he stated that vision would involve change, and therefore he requested for prayer "as we seek to fulfill that vision." At the same time, he concurred with the long-standing UBS objectives: "to provide ministerial training that is soundly biblical and emphasize holiness of life that is relevant to the contemporary Indian context".',
            image: '../../../../assets/history/image_5.png'
        },

        {
            number: '06',
            year: 'March 8–9, 1993',
            title: 'The Celebration of the 40th Anniversary',
            description:
                'The celebration of the 40th anniversary was a milestone in the history of UBS. Two full days were set apart by the UBS Alumni Association (UBSAA) to recall and celebrate the goodness of the Lord in the existence of UBS. One hundred and twenty graduates, some with their families, came to UBS with a deep sense of gratitude for God’s abiding faithfulness. These graduates represented different years, states, and degree programmes. They came to share the living stories of their ministry with members of their own family—the UBS family.',
            image: '../../../../assets/history/image_6.png'
        }

    ];


    /* =========================================================
       HISTORICAL GALLERY
    ========================================================= */

    historicalGallery: HistoryGallery[] = [

        {
            title: 'The Qumran Hostel Dormitory',
            subtitle: 'Crowded but Comfortable',
            year: '1972',
            image: '../../../../assets/history/image_7.png',
            large: true
        },

        {
            title: 'The Touring Choir',
            subtitle: 'Rev. Paul Waghata & The Touring Choir at Ahmedabad',
            year: '1973–74',
            image: '../../../../assets/history/image_8.png'
        },

        {
            title: 'Inauguration of CMS',
            subtitle: 'A Concrete step towards the Realization of Vision',
            image: '../../../../assets/history/image_9.png'
        },

        {
            title: 'Library in Yeotmal',
            subtitle: 'A Place of Research',
            image: '../../../../assets/history/image_10.png',
            large: true
        },

        {
            title: "Principal's Bunglow in Pune",
            subtitle: 'A Symbol of Growth',
            year: '1999',
            image: '../../../../assets/history/image_11.png',
            large: true
        },

        {
            title: 'Chapel in Pune Campus',
            subtitle: 'A Tower of Refuge and Strength',
            year: '1999',
            image: '../../../../assets/history/image_12.png',
        },

        {
            title: 'Football in Pune Campus',
            subtitle: 'Ministry includes Physical Fitness',
            year: '1999',
            image: '../../../../assets/history/image_13.png'
        },

        {
            title: 'The Entrance of UBS, Pune',
            subtitle: 'The gateway to witness a great vision',
            year: '1999',
            image: '../../../../assets/history/image_14.png',
            large: true
        }

    ];


    /* =========================================================
       40TH ANNIVERSARY IMAGES
    ========================================================= */

    anniversaryImages: string[] = [

        '../../../../assets/history/image_1.png',

        '../../../../assets/history/image_2.png',

        '../../../../assets/history/image_3.png',

        '../../../../assets/history/image_4.png',

        '../../../../assets/history/image_5.png'

    ];


    /* =========================================================
       CAMPUS DEVELOPMENT CARDS
    ========================================================= */

    campusDevelopment = [

        {
            number: '01',
            title: 'Additional Infrastructure',
            icon: '⌂',
            description:
                'As the ministry expands, UBS continues to recognize the need for additional infrastructure and improved facilities.'
        },

        {
            number: '02',
            title: 'Faculty Housing',
            icon: '▣',
            description:
                'Improvement is needed in the quality of staff housing, with a need for building more faculty homes.'
        },

        {
            number: '03',
            title: 'Centre for Ministry',
            icon: '✦',
            description:
                'A new building is planned to serve as a Centre for Missions, Christian Education, and Pastoral and Counselling Studies.'
        },

        {
            number: '04',
            title: 'Community Development',
            icon: '◇',
            description:
                'UBS has trained girls and women from nearby slums with income-generating skills and plans to extend this work to young men.'
        },

        {
            number: '05',
            title: 'Primary School',
            icon: '▤',
            description:
                'A primary school project was started for poor children, reflecting the vision that theological education should serve the whole of society.'
        },

        {
            number: '06',
            title: 'Tyrannus Hall International',
            icon: '✧',
            description:
                'A partnership providing hostel facilities to college and university students while nurturing them in the love of Jesus Christ.'
        }

    ];


    /* =========================================================
       OUR JOURNEY — auto-advancing stage (5s delay, pause on hover)
    ========================================================= */

    activeTimelineIndex = 0;
    timelineExpanded = false;

    private timelineAutoplayTimer?: ReturnType<typeof setInterval>;
    private timelineAutoplayPaused = false;
    private readonly timelineAutoplayDelayMs = 5000;

    selectTimelineItem(index: number): void {
        this.activeTimelineIndex = index;
        this.timelineExpanded = false;
        this.restartTimelineAutoplay();
    }

    pauseTimelineAutoplay(): void {
        this.timelineAutoplayPaused = true;
    }

    resumeTimelineAutoplay(): void {
        this.timelineAutoplayPaused = false;
    }

    private startTimelineAutoplay(): void {
        if (typeof window === 'undefined') return;

        this.timelineAutoplayTimer = setInterval(() => {
            if (this.timelineAutoplayPaused) return;
            this.activeTimelineIndex =
                (this.activeTimelineIndex + 1) % this.historyTimeline.length;
            this.timelineExpanded = false;
        }, this.timelineAutoplayDelayMs);
    }

    private restartTimelineAutoplay(): void {
        if (this.timelineAutoplayTimer) clearInterval(this.timelineAutoplayTimer);
        this.startTimelineAutoplay();
    }


    /* =========================================================
       SCROLL ANIMATION
    ========================================================= */

    ngAfterViewInit(): void {

        this.startTimelineAutoplay();

        if (typeof IntersectionObserver === 'undefined') {
            return;
        }

        const elements =
            document.querySelectorAll(
                '.history-reveal'
            );

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add('is-visible');

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        elements.forEach(element => {
            observer.observe(element);
        });

    }

    ngOnDestroy(): void {
        if (this.timelineAutoplayTimer) clearInterval(this.timelineAutoplayTimer);
    }

}