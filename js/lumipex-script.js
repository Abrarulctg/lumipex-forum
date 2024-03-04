const handleSearchBtn = () => {
    const searchInputElement = document.getElementById('search-input');
    const searchInput = searchInputElement.value;
    console.log(searchInput);
    // fetchData(searchInput)
}

const allBlogsContainer = document.getElementById('blog-container')

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
            console.log(data)
            const allBlogs = data.posts;
            console.log(allBlogs);

            for (const blog of allBlogs) {
                console.log(blog);
                // let activeBadge = '';
                // if (blog.isActive) {
                //     activeBadge = greenBadge;
                // }
                // console.log(activeBadge);
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
                        <div>
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
                                <button class="text-[#10B981] text-[20px]"><i
                                        class="fa-solid fa-envelope-open"></i></button>
                            </div>
                        </div>
                    </div>
                `
                allBlogsContainer.appendChild(newCard);
            }

        })

    // .then(({ data }) => {
    //     // const allBlog = data.posts;
    //     // console.log(allBlog);
    //     for (const singleblog of data) {
    //         console.log(singleblog)
    //     }


}



displayAllBlog();