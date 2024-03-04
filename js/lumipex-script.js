const allBlogsContainer = document.getElementById('blog-container')
const latestPostContainer = document.getElementById('latest-post-container')
const markAsReadCounter = document.getElementById('mark-as-read-container');


const handleSearchBtn = () => {
    const searchInputElement = document.getElementById('search-input');
    const searchInput = searchInputElement.value;
    console.log(searchInput);
    displayBlogByCategory(searchInput);
}


let greenBadge = `<svg class="absolute -top-1 -right-1" width="18.666672" height="18.666748"
viewBox="0 0 18.6667 18.6667" fill="none" xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink">
<desc>
    Created with Pixso.
</desc>
<defs />
<rect id="Status" x="1.000000" y="1.000000" rx="8.333334" width="16.666668"
    height="16.666668" fill="#10B981" fill-opacity="1.000000" />
<rect id="Status" x="1.000000" y="1.000000" rx="8.333334" width="16.666668"
    height="16.666668" stroke="#FFFFFF" stroke-opacity="1.000000"
    stroke-width="2.000000" />
</svg>`;

let redBadge = `<svg class="absolute -top-1 -right-1" width="18.666672" height="18.666626"
viewBox="0 0 18.6667 18.6666" fill="none" xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink">
<desc>
    Created with Pixso.
</desc>
<defs />
<rect id="Status" x="1.000000" y="1.000000" rx="8.333334" width="16.666668"
    height="16.666668" fill="#FF3434" fill-opacity="1.000000" />
<rect id="Status" x="1.000000" y="1.000000" rx="8.333334" width="16.666668"
    height="16.666668" stroke="#FFFFFF" stroke-opacity="1.000000"
    stroke-width="2.000000" />
</svg>`;
// console.log(greenBadge)


const displayAllBlog = () => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const allBlogs = data.posts;
            // console.log(allBlogs);
            // displayFetchedData(allBlogs);
            toggleLoadingSpinner(true)
            setTimeout(function () {
                displayFetchedData(allBlogs);
                toggleLoadingSpinner(false)
            }, 2000);
        })
}

const displayBlogByCategory = (blogCategory) => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${blogCategory}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)

            const allBlogs = data.posts;
            console.log(allBlogs);
            //Displaying Loading Spinner
            // toggleLoadingSpinner(true);
            allBlogsContainer.innerHTML = '';
            displayFetchedData(allBlogs);
        })
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading === true) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// const displayBlogByCategory = (blogCategory) => {
//     const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${blogCategory}`
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data)
//             const allBlogs = data.posts;
//             console.log(allBlogs);
//             //Displaying Loading Spinner
//             toggleLoadingSpinner(true);
//             allBlogsContainer.innerHTML = '';
//             displayFetchedData(allBlogs);
//         })
// }

const displayFetchedData = (allBlogs) => {
    for (const blog of allBlogs) {
        // console.log(blog);
        const newCard = document.createElement('div');
        newCard.innerHTML = `
            <div class="flex gap-6 bg-[#797dfc1a] border border-[#797DFC] p-10 rounded-3xl mb-4">
                <!-- blog-Author Image -->
                <div class="relative">
                    <!-- The div below will be replaced by blog author img -->
                    <img src="${blog.image}" class="w-[72px] rounded-xl" />
                    ${blog.isActive ? greenBadge : redBadge}
                </div>
                <!-- blog details -->
                <div class="w-full">
                    <div class="flex text-[14px] font-[500] mb-3">
                        <p class="mr-10"># <span>${blog.category}</span></p>
                        <p>Author: <span>${blog.author.name}</span></p>
                    </div>
                    <h1 class="text-xl text-[#12132D] font-bold mb-4">${blog.title}</h1>
                    <p class="text-[#12132d99]">${blog.description}</p>
                    <hr class="my-5 border-dashed border-[#12132d40]">
                    <div class="flex justify-between text-[#12132d96]">
                        <div class=" flex gap-7 text-base">
                            <p><i class="fa-regular fa-message"> </i> ${blog.comment_count}</p>
                            <p><i class="fa-regular fa-eye"></i> ${blog.view_count}</p>
                            <p><i class="fa-regular fa-clock"></i> ${blog.posted_time} min</p>
                        </div>
                        <button onclick="handleMarkAsRead('${blog.title.replace("'", "#")}', ${blog.view_count})" class="text-[#10B981] text-[20px]"><i
                                class="fa-solid fa-envelope-open"></i></button>
                    </div>
                </div>
            </div>
        `
        allBlogsContainer.appendChild(newCard);
    }
}
// Handling Mark As Read Button
const handleMarkAsRead = (title, view_count) => {
    const titleText = title.replace("#", '');
    console.log(titleText)
    let markedAsReadCount = document.getElementById('marked-as-read-count');
    let markedAsReadCountElement = markedAsReadCount.innerText;
    let markAsReadNumber = parseInt(markedAsReadCountElement);

    // Calculate and Updating MarkAsReadCounter
    markAsReadNumber = markAsReadNumber + 1;
    markedAsReadCount.innerText = markAsReadNumber;

    // Creating HTML Element on MarkAsRead Section
    const markAsRead = document.createElement('div');
    markAsRead.innerHTML = `
        <div class="flex justify-between items-center gap-4 bg-white rounded-xl p-4 mb-4">
            <h1 class="text-base text-[#12132D] font-bold">${titleText}</h1>
            <div class="flex items-center text-[#12132d99]">
                <i class="fa-regular fa-eye mr-2"></i>
                <p>${view_count}</p>
            </div>
        </div>
    `;
    markAsReadCounter.appendChild(markAsRead);
}

const displayLatestPosts = () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            for (const singlePost of data) {
                // console.log(singlePost);
                const newCard = document.createElement('div')
                newCard.innerHTML = `
                <div class="flex justify-center">
                    <div class="card card-compact w-96 bg-base-100 border shadow-md p-6">
                        <figure><img src="${singlePost.cover_image}"
                                alt="Post Cover" />
                        </figure>
                        <div class="card-body">
                            <p class="text-[#12132d99]"><i class="fa-regular fa-calendar-days"></i> ${singlePost.author.posted_date || 'No publish date'}</p>
                            <h2 class="card-title text-[#12132D] text-[18px] font-bold">${singlePost.title}</h2>
                            <p class="text-[#12132d99]">${singlePost.description}</p>
                            <div class="card-actions ">
                                <div class="flex gap-3">
                                    <img class="w-12 h-12 rounded-full" src="${singlePost.profile_image}" alt="">
                                    <div>
                                        <h2 class="font-[#12132d99] font-bold">${singlePost.author.name}</h2>
                                        <p class="text-xs">${singlePost.author.designation || "Unknown"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
                latestPostContainer.appendChild(newCard);
            }

        })
}


displayAllBlog();
displayLatestPosts();