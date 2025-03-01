import { conveeData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    console.log("clicked!");
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.share) {
    handleConveeClick(e.target.dataset.share);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "convee-btn") {
    handleConveeBtnCLick();
  }
});

function handleLikeClick(conveeId) {
  const targetConveeObj = conveeData.find(function (convee) {
    return convee.uuid === conveeId;
  });

  // if (!targetConveeObj) {
  //   console.error("Convee not found for ID:", conveeId);
  //   return;
  // }

  // console.log("Found convee:", targetConveeObj);

  if (targetConveeObj.isLiked) {
    targetConveeObj.likes--;
  } else {
    targetConveeObj.likes++;
  }

  targetConveeObj.isLiked = !targetConveeObj.isLiked;
  render();
}

function handleConveeClick(conveeId) {
  const targetConveeObj = conveeData.find(function (convee) {
    return convee.uuid === conveeId;
  });

  if (targetConveeObj.isConvee) {
    targetConveeObj.convee--;
  } else {
    targetConveeObj.convee++;
  }
  targetConveeObj.isConvee = !targetConveeObj.isConvee;

  render();
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleConveeBtnCLick() {
  const conveeInput = document.getElementById("convee-input");

  if (conveeInput.value) {
    conveeData.unshift({
      handle: `@huskyVoice12`,
      profilePic: `images/huskyVoice.webp`,
      likes: 0,
      convee: 0,
      conveeText: `${conveeInput.value}`,
      replies: [],
      isLiked: false,
      isConvee: false,
      uuid: uuidv4(),
    });
    render();

    conveeInput.value = "";
  }
}

function getFeedHtml() {
  let feedHtml = "";

  conveeData.forEach(function (convee) {
    let likeIconClass = "";

    if (convee.isLiked) {
      likeIconClass = "liked";
    }

    let shareIconClass = "";

    if (convee.isConvee) {
      shareIconClass = "share";
    }

    let repliesHTML = "";

    if (convee.replies.length > 0) {
      convee.replies.forEach(function (reply) {
        repliesHTML += `
      <div class="convee-reply">
        <div class="convee-inner">
          <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="convee-text">${reply.conveeText}</p>
            </div>
        </div>
      </div>
        `;
      });
    }

    feedHtml += `
    <div class="convee">
        <div class="convee-inner">
            <img src="${convee.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${convee.handle}</p>
                <p class="convee-text">${convee.conveeText}</p>
                <div class="convee-details">
                    <span class="convee-detail">
                        <i class="fa-regular fa-comment-dots" data-reply="${convee.uuid}"></i>
                        ${convee.replies.length}
                    </span>
                    <span class="convee-detail">
                        <i class="fa-solid fa-heart ${likeIconClass}" data-like="${convee.uuid}"></i>
                        ${convee.likes}
                    </span>
                    <span class="convee-detail">
                        <i class="fa-solid fa-share ${shareIconClass}" data-share="${convee.uuid}"></i>
                        ${convee.convee}
                    </span>
                </div>   
            </div>            
        </div>

        <div class = "hidden" id="replies-${convee.uuid}">
          ${repliesHTML}
        </div>
    </div>
    `;
  });
  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
// function render() {
//   const feed = document.getElementById("feed");
//   if (!feed) {
//     console.error("Feed element not found");
//     return;
//   }
//   feed.innerHTML = getFeedHtml();
//   console.log("Feed element after rendering:", feed);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   render();
// });
