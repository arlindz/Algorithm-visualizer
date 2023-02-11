const UI = {
    bfs: ["<div id='start-searching' class='button'>Start</div><div id='add-targets' class='button'>Add targets</div><div id='wall'class='button'>Add walls</div><div class='button'><div id='add-random-targets'>Add random targets</div><input id='random-targets-count'type='number'></div><div id='start' class='button'>Change start point</div><div id='reset-grid' class='button'>Reset grid</div>", ['wall', 'start', 'add-targets']],
    dfs: ["<div id='start-searching' class='button'>Start</div><div id='changeTarget' class= 'button'>Change target</div><div id='wall'class='button'>Add walls</div><div id='start' class='button'>Change start point</div><div id='reset-grid' class='button'>Reset grid</div>", ['wall', 'start', 'changeTarget']],
    biswarm: ["<div id='start-searching' class='button'>Start</div><div id='start1' class='button'>Change 'start1'</div><div id='wall'class='button'>Add walls</div><div id='start2' class='button'>Change 'start2'</div><div id='reset-grid' class='button'>Reset grid</div>", ['wall', 'start2', 'start1']]
}
window.addEventListener('load', function () {
    let id = "selection-sort";
    let currentId = "selection-sort";
    let currentIdForSearch = "bfs";
    let numberOfElements = 70;
    let currentRows, currentCols;
    let delay = 0.02;
    let currentMode = 'wall';
    let currentTargets = { currentTargetCount: 0 };
    let startedSearching = false;
    let mapSort = { "selection-sort": 0, "insertion-sort": 1, "shell-sort": 2, "quick-sort": 3, "merge-sort": 4 };
    let mapSearch = { "dfs": 0, "bfs": 1, "biswarm": 2 };
    let idsSort = ["selection-sort", "insertion-sort", "shell-sort", "quick-sort", "merge-sort"];
    let idsSearch = ["dfs", "bfs", "biswarm"];
    let first = true;
    let wallCoordinates = {};
    let colors = {
        start: "#CFDFFF",
        start1: "#CFDFFF",
        start2: "#00FFEF",
        changeTarget: '#FFCCCB'
    };
    let functionsSort = [selectionSort, insertionSort, shellSort, quickSort, mergeSort];
    let searchFunctions = [dfs, bfs, biswarmSearch];
    let starts = {
        start: [null, null],
        start1: [null, null],
        start2: [null, null],
        changeTarget: [null, null]
    };
    first = false;
    for (let i = 0; i < idsSearch.length; i++)
        document.getElementById(idsSearch[i]).addEventListener('click', function () {
            document.getElementById(currentIdForSearch).style.border = "1px solid black";
            document.getElementById(currentIdForSearch).style.backgroundColor = "#5791b3";
            document.getElementById(currentIdForSearch).style.color = "black";
            currentIdForSearch = idsSearch[i];
            document.getElementById(currentIdForSearch).style.border = "1px solid #046ec4";
            document.getElementById(currentIdForSearch).style.backgroundColor = "#046ec4";
            document.getElementById(currentIdForSearch).style.color = "white";
        });
    for (let i = 0; i < idsSort.length; i++)
        document.getElementById(idsSort[i]).addEventListener("click", function () {
            document.getElementById(id).style.border = "1px solid black";
            document.getElementById(id).style.backgroundColor = "#5791b3";
            document.getElementById(id).style.color = "black";
            id = idsSort[i];
            document.getElementById(id).style.border = "1px solid #046ec4";
            document.getElementById(id).style.backgroundColor = "#046ec4";
            document.getElementById(id).style.color = "white";
        });
    document.getElementById("start-search").addEventListener('click', function () {
        let gridRowsCols = generateUI(currentIdForSearch);
        document.getElementById("start-searching").addEventListener('click', function () {
            startedSearching = true;
            searchFunctions[mapSearch[currentIdForSearch]](gridRowsCols);
        });
    });
    document.getElementById("start-sort").addEventListener('click', function () {
        let prev = document.getElementById("sorting-container");
        let e1 = document.getElementById("searching-container");
        if (e1 != null) e1.remove();
        if (prev != null) prev.remove();
        delay = document.getElementById("delay").value / 1000;
        numberOfElements = document.getElementById("numOfElements").value;
        if (delay <= 0) delay = 0.01;
        if (numberOfElements == 0) numberOfElements = 50;
        currentId = id;
        functionsSort[mapSort[id]]();
    });
    async function wait(s) {
        return new Promise((resolve) => setTimeout(resolve, s * 1000));
    }
    function mergeSort() {
        if (first) return;
        let array = [];
        let secs = delay;
        let numOfEls = numberOfElements
        for (let i = 0; i < numOfEls; i++)
            array.push(Math.floor(Math.random() * 80) + 21);
        console.log(array);
        let string = "<div id='sorting-container'class='container'><div id='sorting-area' class='sorting-area'>";
        for (let i = 0; i < numOfEls; i++)
            string += "<div id='element" + i + "' class='array-element'></div>"
        string += "</div></div>"
        document.getElementById("offset").insertAdjacentHTML("afterend", string);
        document.getElementById("offset").innerHTML = "";
        let maxArrVal = 100;
        let maxHeight = document.getElementById("sorting-area").clientHeight;
        let areaWidth = document.getElementById("sorting-area").clientWidth;
        for (let i = 0; i < array.length; i++) {
            let elementHeight = array[i] * maxHeight / maxArrVal + "px";
            document.getElementById('element' + i).style.height = elementHeight;
            document.getElementById('element' + i).style.width = 10 * areaWidth / (10 * numOfEls + 2 * (numOfEls - 1)) + "px";
        }
        async function mergeS(a) {
            async function merge(arr, array1, array2, start1, start2) {
                console.log("current arrays to merge [" + array1 + "], [" + array2 + "] start1 is " + start1 + " start2 is " + start2);
                let i = 0, j = 0, k = 0, startRef = start1;
                if (currentId != "merge-sort") return;
                document.getElementById("element" + start1).style.backgroundColor = "red";
                document.getElementById("element" + start2).style.backgroundColor = "red";
                while (i < array1.length && j < array2.length) {
                    if (array1[i] < array2[j]) {
                        arr[k++] = array1[i];
                        document.getElementById("element" + start1).style.backgroundColor = "red"
                        await wait(secs);
                        if (currentId != "merge-sort") return;
                        let h1 = array1[i++] * maxHeight / maxArrVal;
                        document.getElementById("element" + startRef).style.height = h1 + "px";
                        document.getElementById("element" + start1).style.backgroundColor = "black";
                        start1++
                        startRef++;
                    } else {
                        if (currentId != "merge-sort") return;
                        arr[k++] = array2[j];
                        console.log(startRef);
                        document.getElementById("element" + start2).style.backgroundColor = "red"
                        await wait(secs);
                        if (currentId != "merge-sort") return;
                        let h1 = array2[j++] * maxHeight / maxArrVal;

                        document.getElementById("element" + startRef).style.height = h1 + "px";
                        document.getElementById("element" + start2).style.backgroundColor = "black";
                        start2++;
                        startRef++;
                    }
                }
                while (i < array1.length) {
                    if (currentId != "merge-sort") return;
                    let h1 = array1[i] * maxHeight / maxArrVal;
                    document.getElementById("element" + start1).style.backgroundColor = "red"
                    await wait(secs);
                    if (currentId != "merge-sort") return;
                    console.log("Start ref: " + startRef);

                    document.getElementById("element" + startRef).style.height = h1 + "px";
                    document.getElementById("element" + start1).style.backgroundColor = "black";
                    start1++;
                    startRef++;
                    arr[k++] = array1[i++];
                }

                while (j < array2.length) {
                    let h1 = array2[j] * maxHeight / maxArrVal;
                    document.getElementById("element" + start2).style.backgroundColor = "red"
                    await wait(secs);
                    if (currentId != "merge-sort") return;
                    document.getElementById("element" + startRef).style.height = h1 + "px";
                    document.getElementById("element" + start2).style.backgroundColor = "black";
                    start2++;
                    startRef++;
                    arr[k++] = array2[j++];
                }
            }

            async function sort(arr, lo, hi) {
                if (arr.length < 2) return;
                let array1 = [], array2 = [];
                let mid = Math.floor(arr.length / 2);
                for (let i = 0; i < mid; i++) array1.push(arr[i]);
                for (let i = mid; i < arr.length; i++) array2.push(arr[i]);
                let low = lo, medium = mid + lo;
                await wait(secs);
                if (currentId != "merge-sort") return;
                await sort(array1, low, medium);
                if (currentId != "merge-sort") return;
                await sort(array2, medium, hi);
                if (currentId != "merge-sort") return;
                await merge(arr, array1, array2, low, medium);
            }
            await sort(a, 0, a.length);
            if (currentId != "merge-sort") return;
            for (let i = 0; i < array.length; i++)
                document.getElementById("element" + i).style.backgroundColor = "black";
            for (let i = 0; i < array.length; i++) {
                await wait(0.3 / numberOfElements);
                document.getElementById("element" + i).style.backgroundColor = "green";
            }
        }
        for (let i = 0; i < array.length; i++) {
            document.getElementById("element" + i).style.backgroundColor = "black";
        }
        mergeS(array);

    }
    function shellSort() {
        if (first) return;
        let array = [];
        let secs = delay;
        let numOfEls = numberOfElements
        for (let i = 0; i < numOfEls; i++)
            array.push(Math.floor(Math.random() * 80) + 21);
        console.log(array);
        let string = "<div id='sorting-container'class='container'><div id='sorting-area' class='sorting-area'>";
        for (let i = 0; i < numOfEls; i++)
            string += "<div id='element" + i + "' class='array-element'></div>"
        string += "</div></div>"
        document.getElementById("offset").insertAdjacentHTML("afterend", string);
        document.getElementById("offset").innerHTML = "";
        let maxArrVal = 100;
        let maxHeight = document.getElementById("sorting-area").clientHeight;
        let areaWidth = document.getElementById("sorting-area").clientWidth;
        for (let i = 0; i < array.length; i++) {
            if (currentId != "shell-sort") return;
            let elementHeight = array[i] * maxHeight / maxArrVal + "px";
            document.getElementById('element' + i).style.height = elementHeight;
            document.getElementById('element' + i).style.width = 10 * areaWidth / (10 * numOfEls + 2 * (numOfEls - 1)) + "px";
        }
        async function sort() {
            let h = 1;
            while (h < array.length) h = h * 3 + 1;
            while (h >= 1) {
                for (let i = h; i < array.length; i++) {
                    if (currentId != "shell-sort") return;
                    await wait(secs);
                    document.getElementById("element" + i).style.backgroundColor = "red";
                    let sortedElement = i;
                    for (let j = i; j >= h && array[j] < array[j - h]; j -= h) {
                        if (currentId != "shell-sort") return;
                        await wait(secs);
                        document.getElementById("element" + (j - h)).style.backgroundColor = "#8B0000";
                        sortedElement = j - h;
                        let height1 = document.getElementById("element" + j).clientHeight;
                        let height2 = document.getElementById("element" + (j - h)).clientHeight;
                        array[j] = array[j] + array[j - h];
                        array[j - h] = array[j] - array[j - h];
                        array[j] = array[j] - array[j - h];
                        await wait(secs);
                        document.getElementById("element" + (j - h)).style.height = height1 + "px";
                        document.getElementById("element" + j).style.height = height2 + "px";
                        document.getElementById("element" + j).style.backgroundColor = "#8B0000";
                        document.getElementById("element" + (j - h)).style.backgroundColor = "red";
                        await wait(secs);
                        document.getElementById("element" + j).style.backgroundColor = "black";
                    }
                    if (sortedElement - h >= 0) {
                        document.getElementById("element" + sortedElement).style.backgroundColor = "red";
                        await wait(secs);
                        document.getElementById("element" + (sortedElement - h)).style.backgroundColor = "#8B0000";
                        await wait(secs);
                        document.getElementById("element" + (sortedElement - h)).style.backgroundColor = "black";
                        document.getElementById("element" + sortedElement).style.backgroundColor = "black";
                    } else document.getElementById("element" + sortedElement).style.backgroundColor = "black";
                    if (document.getElementById("element" + i).style.backgroundColor != "black") {
                        await wait(secs);
                        document.getElementById("element" + i).style.backgroundColor = "black";
                    }
                }
                h = Math.floor(h / 3);
            }
            if (currentId != "shell-sort") return;
            confirm(array.length);
        }
        for (let i = 0; i < array.length; i++) {
            document.getElementById("element" + i).style.backgroundColor = "black";
        }
        sort();
    }
    function quickSort() {
        if (first) return;
        let array = [];
        let secs = delay;
        let numOfEls = numberOfElements;
        for (let i = 0; i < numOfEls; i++)
            array.push(Math.floor(Math.random() * 80) + 21);
        console.log(array);
        let string = "<div id='sorting-container'class='container'><div id='sorting-area' class='sorting-area'>";
        for (let i = 0; i < numOfEls; i++)
            string += "<div id='element" + i + "' class='array-element'></div>"
        string += "</div></div>"
        document.getElementById("offset").insertAdjacentHTML("afterend", string);
        document.getElementById("offset").innerHTML = "";
        let maxArrVal = 100;
        let maxHeight = document.getElementById("sorting-area").clientHeight;
        let areaWidth = document.getElementById("sorting-area").clientWidth;
        for (let i = 0; i < array.length; i++) {
            if (currentId != "quick-sort") return;
            let elementHeight = array[i] * maxHeight / maxArrVal + "px";
            document.getElementById('element' + i).style.height = elementHeight;
            document.getElementById('element' + i).style.width = 10 * areaWidth / (10 * numOfEls + 2 * (numOfEls - 1)) + "px";
        }
        async function quickSort() {
            async function sort(lo = 0, hi = array.length - 1) {
                if (hi <= lo) return;
                let loRef = lo, hiRef = hi;
                let pivot = hi--;
                if (lo == hi) {
                }
                while (lo < hi) {
                    if (currentId != "quick-sort") return;
                    document.getElementById("element" + lo).style.backgroundColor = "gray";
                    document.getElementById("element" + hi).style.backgroundColor = "gray";
                    while (lo < hi && array[lo] <= array[pivot]) {
                        if (currentId != "quick-sort") return;
                        await wait(secs);
                        lo++;
                        document.getElementById("element" + lo).style.backgroundColor = "gray";
                        document.getElementById("element" + (lo - 1)).style.backgroundColor = "black";
                    }
                    document.getElementById("element" + lo).style.backgroundColor = "red";
                    while (lo < hi && array[hi] >= array[pivot]) {
                        if (currentId != "quick-sort") return;
                        await wait(secs);
                        hi--;
                        document.getElementById("element" + hi).style.backgroundColor = "gray";
                        document.getElementById("element" + (hi + 1)).style.backgroundColor = "black";
                    }
                    document.getElementById("element" + hi).style.backgroundColor = "blue";
                    await wait(secs);
                    if (currentId != "quick-sort") return;
                    let height1 = document.getElementById("element" + lo).style.height;
                    let height2 = document.getElementById("element" + hi).style.height;
                    document.getElementById("element" + lo).style.height = height2;
                    document.getElementById("element" + hi).style.height = height1;
                    document.getElementById("element" + lo).style.backgroundColor = "blue";
                    document.getElementById("element" + hi).style.backgroundColor = "red";
                    await wait(secs);
                    if (currentId != "quick-sort") return;
                    document.getElementById("element" + lo).style.backgroundColor = "black";
                    document.getElementById("element" + hi).style.backgroundColor = "black";
                    let ref = array[lo];
                    array[lo] = array[hi];
                    array[hi] = ref;
                }
                if (array[lo] > array[pivot]) {
                    let ref = array[pivot];
                    array[pivot] = array[lo];
                    array[lo] = ref;
                    if (currentId != "quick-sort") return;
                    let height1 = document.getElementById("element" + lo).style.height;
                    let height2 = document.getElementById("element" + pivot).style.height;
                    document.getElementById("element" + lo).style.backgroundColor = "green";
                    document.getElementById("element" + lo).style.height = height2;
                    document.getElementById("element" + pivot).style.height = height1;
                } else {
                    lo = hiRef;
                    if (currentId != "quick-sort") return;
                    document.getElementById("element" + lo).style.backgroundColor = "green";
                }
                await sort(loRef, lo - 1);
                if (currentId != "quick-sort") return;
                await sort(lo + 1, hiRef);
                if (currentId != "quick-sort") return;
            }
            await sort();
            if (currentId != "quick-sort") return;
            confirmQuickSort(array.length, secs);
        }
        for (let i = 0; i < array.length; i++) {
            document.getElementById("element" + i).style.backgroundColor = "black";
        }
        quickSort();
    }
    async function confirmQuickSort(lim, secs) {
        for (let i = 0; i < lim; i++) {
            if (currentId != "quick-sort") return;
            await wait(secs / 10);
            if (document.getElementById("element" + i).style.backgroundColor != "green")
                document.getElementById("element" + i).style.backgroundColor = "red";
        }
        for (let i = 0; i < lim; i++)
            document.getElementById("element" + i).style.backgroundColor = "black";
        for (let i = 0; i < lim; i++) {
            await wait(secs);
            if (currentId != "quick-sort") return;
            document.getElementById("element" + i).style.backgroundColor = "green";
        }
    }
    function selectionSort() {
        if (first) return;
        let array = [];
        let secs = delay;
        let numOfEls = numberOfElements;
        for (let i = 0; i < numOfEls; i++)
            array.push(Math.floor(Math.random() * 80) + 21);
        console.log(array);
        let string = "<div id='sorting-container'class='container'><div id='sorting-area' class='sorting-area'>";
        for (let i = 0; i < numOfEls; i++)
            string += "<div id='element" + i + "' class='array-element'></div>"
        string += "</div></div>"
        document.getElementById("offset").insertAdjacentHTML("afterend", string);
        document.getElementById("offset").innerHTML = "";
        let maxArrVal = 100;
        let maxHeight = document.getElementById("sorting-area").clientHeight;
        let areaWidth = document.getElementById("sorting-area").clientWidth;
        for (let i = 0; i < array.length; i++) {
            let elementHeight = array[i] * maxHeight / maxArrVal + "px";
            document.getElementById('element' + i).style.height = elementHeight;
            document.getElementById('element' + i).style.width = 10 * areaWidth / (10 * numOfEls + 2 * (numOfEls - 1)) + "px";
        }
        async function sort() {
            for (let i = 0; i < array.length; i++) {
                let lastMinIndex = i;
                if (currentId != "selection-sort") return;
                document.getElementById("element" + lastMinIndex).style.backgroundColor = "red";
                await wait(secs);
                for (let j = i + 1; j < array.length; j++) {
                    if (currentId != "selection-sort") return;
                    document.getElementById("element" + j).style.backgroundColor = "gray";
                    await wait(secs)
                    if (array[j] < array[lastMinIndex]) {
                        if (currentId != "selection-sort") return;
                        document.getElementById("element" + lastMinIndex).style.backgroundColor = "black";
                        document.getElementById("element" + j).style.backgroundColor = "red";
                        lastMinIndex = j;
                    } else if (currentId == "selection-sort") document.getElementById("element" + j).style.backgroundColor = "black";
                    else return;
                }
                if (currentId != "selection-sort") return;
                await wait(secs);
                let height1 = document.getElementById("element" + i).clientHeight;
                let height2 = document.getElementById("element" + lastMinIndex).clientHeight;
                array[lastMinIndex] = array[lastMinIndex] + array[i];
                array[i] = array[lastMinIndex] - array[i];
                array[lastMinIndex] = array[lastMinIndex] - array[i];
                if (currentId != "selection-sort") return;
                document.getElementById("element" + i).style.height = height2 + "px";
                document.getElementById("element" + lastMinIndex).style.height = height1 + "px";
                document.getElementById("element" + lastMinIndex).style.backgroundColor = "black";
                document.getElementById("element" + i).style.backgroundColor = "green";
                await wait(secs);
            }//[4,3,1,5,7,2,3,5]
            if (currentId != "selection-sort") return;
            confirm(array.length);
        }
        for (let i = 0; i < array.length; i++) {
            document.getElementById("element" + i).style.backgroundColor = "black";
        }
        sort();

    }
    function insertionSort() {
        if (first) return;
        let array = [];
        let secs = delay;
        let numOfEls = numberOfElements;
        for (let i = 0; i < numOfEls; i++)
            array.push(Math.floor(Math.random() * 80) + 21);
        console.log(array);
        let string = "<div id='sorting-container'class='container'><div id='sorting-area' class='sorting-area'>";
        for (let i = 0; i < numOfEls; i++)
            string += "<div id='element" + i + "' class='array-element'></div>"
        string += "</div></div>"
        document.getElementById("offset").insertAdjacentHTML("afterend", string);
        document.getElementById("offset").innerHTML = "";
        let maxArrVal = 100;
        let maxHeight = document.getElementById("sorting-area").clientHeight;
        let areaWidth = document.getElementById("sorting-area").clientWidth;
        for (let i = 0; i < array.length; i++) {
            let elementHeight = array[i] * maxHeight / maxArrVal + "px";
            document.getElementById('element' + i).style.height = elementHeight;
            document.getElementById('element' + i).style.width = 10 * areaWidth / (10 * numOfEls + 2 * (numOfEls - 1)) + "px";
        }
        async function sort() {
            document.getElementById("element0").style.backgroundColor = "green";
            for (let i = 1; i < array.length; i++) {
                if (currentId != "insertion-sort") return;
                await wait(secs);
                let sortedElement = i;
                document.getElementById("element" + i).style.backgroundColor = "green";
                for (let j = i; j > 0 && array[j] < array[j - 1]; j--) {
                    await wait(secs);
                    if (currentId != "insertion-sort") return;
                    sortedElement = j - 1;
                    document.getElementById("element" + j).style.backgroundColor = "red";
                    await wait(secs);
                    let height1 = document.getElementById("element" + j).clientHeight;
                    let height2 = document.getElementById("element" + (j - 1)).clientHeight;
                    array[j] = array[j] + array[j - 1];
                    array[j - 1] = array[j] - array[j - 1];
                    array[j] = array[j] - array[j - 1];
                    document.getElementById("element" + (j - 1)).style.height = height1 + "px";
                    document.getElementById("element" + j).style.height = height2 + "px";
                    document.getElementById("element" + (j - 1)).style.backgroundColor = "red";
                    document.getElementById("element" + j).style.backgroundColor = "green";
                }
                if (sortedElement != i) await wait(secs);
                document.getElementById("element" + sortedElement).style.backgroundColor = "green";
            }
            if (currentId != "insertion-sort") return;
            confirm(array.length);
        }
        for (let i = 0; i < array.length; i++) {
            document.getElementById("element" + i).style.backgroundColor = "black";
        }
        sort();
    }
    async function confirm(lim) {
        for (let i = 0; i < lim; i++) {
            document.getElementById("element" + i).style.backgroundColor = "black";
        }
        for (let i = 0; i < lim; i++) {
            await wait(0.2 / numberOfElements);
            document.getElementById("element" + i).style.backgroundColor = "green";
        }
    }
    async function bfs(gridSize) {
        if (first) return;
        let grid = [];
        let marked = [];
        let edgeTo = [];
        let secs = delay;
        console.log("delay" + secs);
        let rows = gridSize[0], cols = gridSize[1];
        for (let i = 0; i < rows; i++) {
            let cG = [];
            let cM = [];
            let eT = [];
            for (let j = 0; j < cols; j++) {
                cG.push(Math.floor(Math.random() * 9999) + 1);
                cM.push(false);
                eT.push(null);
            }
            marked.push(cM);
            grid.push(cG);
            edgeTo.push(eT);
        }
        //let t = grid[Math.floor(Math.random()*9)][Math.floor(Math.random()*16)];

        let targetCount = 0;
        let totalTargets = 0;
        for (const prop in currentTargets)
            totalTargets++;
        totalTargets--;
        async function search(t) {
            let I = starts.start[0] == null ? 0 : starts.start[0], J = starts.start[1] == null ? 0 : starts.start[1];
            let queue = [[I, J, null, null, 0]];
            console.log(queue);
            let resCoordinates = [];
            while (queue.length != 0) {
                let current = queue.shift();
                if (current[0] >= grid.length || current[1] >= grid[0].length || current[0] < 0 || current[1] < 0) continue;
                if (marked[current[0]][current[1]]) continue;
                if ((current[0] + "," + current[1]) in wallCoordinates) continue;
                marked[current[0]][current[1]] = true;
                document.getElementById("block" + I + "," + J).style.backgroundColor = colors.start;
                console.log(current[0] + "," + current[1]);
                if ((current[0] + "," + current[1]) in t) {
                    edgeTo[current[0]][current[1]] = [current[2], current[3], current[4]];
                    document.getElementById("block" + current[0] + "," + current[1]).style.backgroundColor = "rgb(81, 14, 74)";
                    resCoordinates = [current[0], current[1]];
                    highlight(resCoordinates);
                    targetCount++;
                    if (targetCount == totalTargets) break;
                }
                if (edgeTo[current[0]][current[1]] == null || edgeTo[current[0]][current[1]][2] < current[4])
                    edgeTo[current[0]][current[1]] = [current[2], current[3], current[4]];
                await wait(secs);
                document.getElementById("block" + current[0] + "," + current[1]).style.backgroundColor = "rgb(76, 186, 206)";
                queue.push([current[0] + 1, current[1], current[0], current[1], current[4] + 1]);
                queue.push([current[0] - 1, current[1], current[0], current[1], current[4] + 1]);
                queue.push([current[0], current[1] + 1, current[0], current[1], current[4] + 1]);
                queue.push([current[0], current[1] - 1, current[0], current[1], current[4] + 1]);
                async function highlight(resCoordinates) {
                    console.log("highlighting...")
                    let i = resCoordinates[0], j = resCoordinates[1];
                    let toIterate = [[i, j]];
                    console.log(edgeTo[i][j][0]);
                    while (i != starts.start[0] || j != starts.start[1]) {
                        toIterate.push([i, j]);
                        let refI = i, refJ = j;
                        i = edgeTo[refI][refJ][0];
                        j = edgeTo[refI][refJ][1];
                        if (edgeTo[i][j][0] == null) {
                            toIterate.push([i, j]);
                            break;
                        }
                    }
                    toIterate.push([starts.start[0], starts.start[1]]);
                    for (let k = toIterate.length - 1; k >= 0; k--) {
                        console.log("Trying to iterate over coordinates: " + toIterate[k][0] + ", " + toIterate[k][1]);
                        await wait(secs);
                        document.getElementById("block" + toIterate[k][0] + "," + toIterate[k][1]).style.backgroundColor = '#90EE90';
                    }
                    await wait(0.18)
                    for (let k = toIterate.length - 1; k >= 0; k--) {
                        console.log("Trying to iterate over coordinates: " + toIterate[k][0] + ", " + toIterate[k][1]);
                        await wait(secs);
                        document.getElementById("block" + toIterate[k][0] + "," + toIterate[k][1]).style.backgroundColor = 'rgb(76, 186, 206)';
                    }
                }
            }
        }
        await search(currentTargets);
        startedSearching = false;
    }
    async function dfs(gridSize) {
        if (first) return;
        let rows = gridSize[0], cols = gridSize[1];
        let grid = [];
        let marked = [];
        let edgeTo = [];
        for (let i = 0; i < rows; i++) {
            let cG = [];
            let cM = [];
            let ceT = [];
            for (let j = 0; j < cols; j++) {
                cG.push(Math.floor(Math.random() * 999) + 1);
                ceT.push(null);
            }
            marked.push(cM);
            grid.push(cG);
            edgeTo.push(ceT);
        }
        let secs = delay;
        let targetI, targetJ;

        //let t = grid[Math.floor(Math.random()*9)][Math.floor(Math.random()*16)];
        let X = starts.changeTarget[0] == null ? 0 : starts.changeTarget[0];
        let Y = starts.changeTarget[1] == null ? 0 : starts.changeTarget[1];
        let t = X + "," + Y;
        async function search(i, j, prevI, prevJ, target) {
            if (i >= grid.length || j >= grid[0].length || i < 0 || j < 0) return false;
            if (marked[i][j]) return false;
            if ((i + "," + j) in wallCoordinates) return false;
            await wait(secs);
            document.getElementById("block" + i + "," + j).style.backgroundColor = "rgb(76, 186, 206)";
            edgeTo[i][j] = [prevI, prevJ];
            await wait(secs);
            if (i + "," + j == target) {
                document.getElementById("block" + i + "," + j).style.backgroundColor = "#90EE90";
                targetI = i, targetJ = j;
                return true;
            }
            marked[i][j] = true;
            let b1 = await search(i + 1, j, i, j, target);
            if (b1 == true) return true;
            let b2 = await search(i, j + 1, i, j, target);
            if (b2 == true) return true;
            let b3 = await search(i - 1, j, i, j, target);
            if (b3 == true) return true;
            let b4 = await search(i, j - 1, i, j, target);
            if (b4 == true) return true;
            return false;
        }
        async function highlightPath() {
            let path = [];
            while (true) {
                let refI = targetI, refJ = targetJ;
                path.push([refI, refJ]);
                targetI = edgeTo[refI][refJ][0];
                targetJ = edgeTo[refI][refJ][1];
                if (targetI == null) break;
            }
            for (let i = path.length - 1; i >= 0; i--) {
                await wait(secs);
                document.getElementById("block" + path[i][0] + "," + path[i][1]).style.backgroundColor = "#90EE90";
                document.getElementById("block" + path[i][0] + "," + path[i][1]).style.border = "1px solid rgb(160, 255, 220)";
            }
        }
        let x = starts.start[0] == null ? 0 : starts.start[0];
        let y = starts.start[1] == null ? 0 : starts.start[1];
        let b = await search(x, y, null, null, t);
        await highlightPath();
        startedSearching = false;
    }
    function addRandomTargets(currentRows, currentCols) {
        document.getElementById("add-random-targets").addEventListener('click', function () {
            let e = document.getElementById("random-targets-count");
            console.log("came, e is " + e.value);
            let count = 0;
            if (e.value < 1 || e.value >= currentCols * currentRows / 3) count = 10;
            else count = Math.floor(e.value);
            currentTargets.currentTargetCount += count;
            for (let i = 0; i < currentRows; i++)
                for (let j = 0; j < currentCols; j++)
                    if (window.getComputedStyle(document.getElementById("block" + i + "," + j)).backgroundColor != 'rgb(238, 130, 238)')
                        document.getElementById("block" + i + "," + j).style.backgroundColor = 'white';
            let targets = {}
            for (let i = 0; i < count; i++) {
                let x = Math.floor(Math.random() * currentRows);
                let y = Math.floor(Math.random() * currentCols);
                while ((x + "," + y) in targets || x == starts.start[0] && y == starts.start[1]) {
                    x = Math.floor(Math.random() * currentRows);
                    y = Math.floor(Math.random() * currentCols);
                }
                targets[x + "," + y] = null;
                document.getElementById("block" + x + "," + y).style.backgroundColor = "#FFCCCB";
            }
            currentTargets = Object.create(targets);
        });
    }
    function generateUI(algorithm) {
        currentTargets = {};
        wallCoordinates = {};
        let e1 = document.getElementById("searching-container");
        let e2 = document.getElementById("sorting-container");
        if (e1 != null) e1.remove();
        if (e2 != null) e2.remove();

        let d = parseInt(document.getElementById("delaySearch").value) / 1000;
        if (d <= 0) delay = 0.01;
        else delay = d;
        let rows = document.getElementById("numOfRows").value == 0 ? 10 : document.getElementById("numOfRows").value;
        let gridRowsCols = generateGrid(rows);
        wallCoordinates = {};
        let currentRows = gridRowsCols[0], currentCols = gridRowsCols[1];
        let string = UI[algorithm][0];
        document.getElementById("offset").innerHTML = string;
        document.getElementById("reset-grid").addEventListener('click', function () {
            resetGrid(currentRows, currentCols, algorithm);
        });
        let arrayForIds = UI[algorithm][1];
        for (let i = 0; i < arrayForIds.length; i++) {
            document.getElementById(arrayForIds[i]).addEventListener('click', function () {
                currentMode = arrayForIds[i];
                console.log("current-mode " + currentMode);
            });
        }
        if (algorithm == 'bfs') addRandomTargets(currentRows, currentCols);
        for (const prop in starts) {
            starts[prop][0] = Math.floor(Math.random() * currentRows);
            starts[prop][1] = Math.floor(Math.random() * currentCols);
        }
        while (starts.start[0] == starts.changeTarget[0] && starts.changeTarget[1] == starts.start[1]) {
            starts.changeTarget[0] = Math.floor(Math.random() * currentRows);
            starts.changeTarget[1] = Math.floor(Math.random() * currentCols);
        }
        currentTargets.currentTargetCount = 1;
        let key = starts.changeTarget[0] + "," + starts.changeTarget[1];
        currentTargets[key] = null;
        if (algorithm != 'biswarm') {
            document.getElementById("block" + starts.start[0] + "," + starts.start[1]).style.backgroundColor = colors.start;
            document.getElementById("block" + starts.changeTarget[0] + "," + starts.changeTarget[1]).style.backgroundColor = '#FFCCCB';
        } else {
            document.getElementById("block" + starts.start1[0] + "," + starts.start1[1]).style.backgroundColor = "#CFDFFF";
            while (starts.start2[0] == starts.start1[0] && starts.start2[1] == starts.start1[1]) {
                starts.start2[0] = Math.floor(Math.random() * currentRows);
                starts.start2[1] = Math.floor(Math.random() * currentCols);
            }
            document.getElementById("block" + starts.start2[0] + "," + starts.start2[1]).style.backgroundColor = "#00FFEF";
        }
        for (let i = 0; i < currentRows; i++) {
            for (let j = 0; j < currentCols; j++) {
                document.getElementById("block" + i + "," + j).addEventListener('click', function () {
                    if (startedSearching) return;
                    if (currentMode == 'add-targets') addTarget(i, j);
                    else if (currentMode == 'changeTarget') changeTarget(i, j, currentMode);
                    else if (currentMode == 'wall') addWall(i, j);
                    else changeStart(i, j, currentMode, colors[currentMode]);
                });
            }
        }
        return gridRowsCols;
    }
    function changeTarget(i, j, mode) {
        document.getElementById("block" + starts[mode][0] + "," + starts[mode][1]).style.backgroundColor = 'white';
        starts[mode] = [i, j];
        document.getElementById("block" + i + "," + j).style.backgroundColor = colors[mode];
    }
    function changeStart(i, j, start, color) {
        document.getElementById("block" + starts[start][0] + "," + starts[start][1]).style.backgroundColor = 'white';
        starts[start] = [i, j];
        document.getElementById("block" + i + "," + j).style.backgroundColor = color;
    }
    function addTarget(i, j) {
        if (i == starts.start[0] && j == starts.start[1]) return;

        if ((i + "," + j) in currentTargets) {
            if (currentTargets.currentTargetCount <= 1) {
                console.log(currentTargets.currentTargetCount)
                return;
            }
            delete currentTargets[i + "," + j];
            currentTargets.currentTargetCount--;
            document.getElementById("block" + i + "," + j).style.backgroundColor = 'white';
        } else {
            console.log("not in taregts");
            currentTargets.currentTargetCount++;
            currentTargets[i + "," + j] = null;
            document.getElementById("block" + i + "," + j).style.backgroundColor = '#FFCCCB';
        }
    }
    function generateGrid(numOfRows) {
        document.getElementById("offset").insertAdjacentHTML('afterend',
            "<div id='searching-container'class='searching-container'><div id='searching-area'class='searching-area'></div></div>");
        let searchAreaHeight = document.getElementById("searching-area").clientHeight;
        let searchAreaWidth = document.getElementById("searching-area").clientWidth;
        let blockHeight = searchAreaHeight / numOfRows - 2;
        console.log("blockHeight = " + blockHeight);
        let searchAreaWidthToBeAssigned = Math.floor(searchAreaWidth / (blockHeight + 2)) * (blockHeight + 2);
        let numOfCols = Math.floor(searchAreaWidthToBeAssigned / (blockHeight + 2));
        document.getElementById("searching-container").remove();
        let string = "<div id='searching-container' class='searching-container'><div id='searching-area'class='searching-area'>";
        for (let i = 0; i < numOfRows; i++)
            for (let j = 0; j < numOfCols; j++)
                string += "<div id='block" + i + "," + j + "'class='searching-block'></div>";
        string += "</div></div>"
        document.getElementById("offset").insertAdjacentHTML('afterend', string);
        document.getElementById("searching-area").style.width = numOfCols * (blockHeight + 1.6) + "px";
        document.getElementById("searching-area").style.height = numOfRows * (blockHeight + 1.6) + "px";
        for (let i = 0; i < numOfRows; i++) {
            for (let j = 0; j < numOfCols; j++) {
                document.getElementById("block" + i + "," + j).style.height = blockHeight + "px";
                document.getElementById("block" + i + "," + j).style.width = blockHeight + "px";
            }
        }
        console.log("Number of rows: " + numOfRows + ", number of cols" + numOfCols + " width of searching area: " + document.getElementById("searching-area").clientWidth);
        return [numOfRows, numOfCols];
    }
    function resetGrid(rows, cols, algorithm) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                document.getElementById("block" + i + "," + j).style.backgroundColor = "white";
                document.getElementById("block" + i + "," + j).style.border = "1px solid lightskyblue";
            }
        }
        starts.start[0] = Math.floor(Math.random() * rows);
        starts.start[1] = Math.floor(Math.random() * cols);
        wallCoordinates = {};
        if (algorithm != 'biswarm') {
            document.getElementById("block" + starts.start[0] + "," + starts.start[1]).style.backgroundColor = colors.start;
            let i = Math.floor(Math.random() * rows);
            let j = Math.floor(Math.random() * cols);
            while (i == starts.start[0] && j == starts.start[1]) {
                j = Math.floor(Math.random() * cols);
                i = Math.floor(Math.random() * rows);
            }
            document.getElementById("block" + i + "," + j).style.backgroundColor = '#FFCCCB';
            starts.changeTarget[0] = i, starts.changeTarget[1] = j;
            currentTargets = {currentTargetCount: 1};
            const key = i + "," + j;
            currentTargets[key] = null;
        } else {
            document.getElementById("block" + starts.start1[0] + "," + starts.start1[1]).style.backgroundColor = "#CFDFFF";
            while (starts.start2[0] == starts.start1[0] && starts.start2[1] == starts.start1[1]) {
                starts.start2[0] = Math.floor(Math.random() * currentRows);
                starts.start2[1] = Math.floor(Math.random() * currentCols);
            }
            document.getElementById("block" + starts.start2[0] + "," + starts.start2[1]).style.backgroundColor = "#00FFEF";
        }
    }
    async function biswarmSearch(gridSize) {
        if (first) return;
        const rows = gridSize[0], cols = gridSize[1], secs = delay;
        let marked = [], edgeToFirst = [], edgeToSecond = [];
        for (let i = 0; i < rows; i++) {
            let cM = [], cetF = [], cetS = [];
            for (let j = 0; j < cols; j++) {
                cM.push(false);
                cetF.push(null);
                cetS.push(null);
            }
            marked.push(cM);
            edgeToFirst.push(cetF);
            edgeToSecond.push(cetS);
        }
        let i = starts.start1[0], j = starts.start1[1]
        let x = starts.start2[0], y = starts.start2[1], meetingCoordinates = null;
        let foundIntersection = false;
        bfsVar(x, y, edgeToSecond, "#00FFEF", "rgb(76, 186, 206)", "rbg(135,206,250)");
        await bfsVar(i, j, edgeToFirst, "#CFDFFF", "#CF9FFF", "#E7D3FD");
        await halt();
        x = meetingCoordinates[0], y = meetingCoordinates[1];
        console.log(meetingCoordinates);
        let path = [];
        let temp1 = edgeToFirst.slice(), temp2 = edgeToSecond.slice();
        console.log(temp1);
        while (true) {
            path.push([x, y]);
            let refX = x, refY = y;
            x = temp1[refX][refY][0];
            y = temp1[refX][refY][1];
            if (temp1[x][y][0] == null) {
                path.push([x, y]);
                break;
            }
        }
        x = edgeToSecond[meetingCoordinates[0]][meetingCoordinates[1]][0];
        y = edgeToSecond[meetingCoordinates[0]][meetingCoordinates[1]][1];
        console.log(edgeToSecond);
        while (true) {
            path.unshift([x, y]);
            let refX = x
            x = temp2[x][y][0];
            y = temp2[refX][y][1];
            if (temp2[x][y][0] == null) {
                path.unshift([x, y]);
                break;
            }
        }
        for (let k = path.length - 1; k >= 0; k--) {
            console.log("SHORTEST PATH CURRENT COORDINATE IS" + path[k][0] + "," + path[k][1]);
            await wait(secs);
            document.getElementById("block" + path[k][0] + "," + path[k][1]).style.backgroundColor = "#90EE90";
            document.getElementById("block" + path[k][0] + "," + path[k][1]).style.border = "1px solid rgb(28, 185, 125)";
        }
        startedSearching = false;
        async function halt() {
            while (!foundIntersection) await wait(0.1);
            await wait(0.1);
        }
        async function bfsVar(i, j, edgeTo, originColor, color, borderColor) {
            let queue = [[i, j, null, null, 0]];
            while (queue.length != 0) {
                if (foundIntersection) return;
                const current = queue.shift();
                let x = current[0], y = current[1], prevX = current[2], prevY = current[3], distance = current[4];
                if (x < 0 || y < 0 || x >= edgeTo.length || y >= edgeTo[0].length) continue;
                if ((x + "," + y) in wallCoordinates) continue;
                if (edgeTo[x][y] != null && distance >= edgeTo[x][y][2]) continue;
                if (foundIntersection) return;
                edgeTo[x][y] = [prevX, prevY, distance];
                if (marked[x][y]) {
                    foundIntersection = true;
                    document.getElementById("block" + x + "," + y).style.backgroundColor = "#90EE90";
                    if (meetingCoordinates == null) meetingCoordinates = [x, y]
                    return;
                }
                marked[x][y] = true;
                if (foundIntersection) return;
                document.getElementById("block" + x + "," + y).style.backgroundColor = color;
                document.getElementById("block" + x + "," + y).style.border = "1px solid " + borderColor;
                document.getElementById("block" + i + "," + j).style.backgroundColor = originColor;
                if (foundIntersection) return;
                await wait(secs);
                if (foundIntersection) return;

                queue.push([x + 1, y, x, y, distance + 1]);
                queue.push([x - 1, y, x, y, distance + 1]);
                queue.push([x, y + 1, x, y, distance + 1]);
                queue.push([x, y - 1, x, y, distance + 1]);
            }
            console.log("outside while");
            return edgeTo
        }
    }
    function addWall(i, j) {
        for (let prop in starts) if (starts[prop][0] == i && starts[prop][1] == j) return;

        let key = i + "," + j;

        if (key in currentTargets) {
            if (currentTargets.currentTargetCount <= 1) return;
            delete currentTargets[key];
            currentTargets.currentTargetCount--;
        }
        if (key in wallCoordinates) {
            delete wallCoordinates[key];
            document.getElementById("block" + i + "," + j).style.backgroundColor = 'white';
        } else {
            wallCoordinates[key] = null;
            document.getElementById("block" + i + "," + j).style.backgroundColor = '#201E20';
        }
    }
});
