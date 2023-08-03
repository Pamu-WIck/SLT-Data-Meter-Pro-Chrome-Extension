export function progressBar(id, dataType, summary) {
    console.log("progressBar function called")

    const summaryWidget = document.getElementById(id);
    const remainPercent = summary.percentage;

    summaryWidget.innerHTML = `<div class="progressAreaBG">
                <div class="progressArea">
                    <div class="row ">
                        <div class="col">
                            <div class="d-flex justify-content-start">
                                <div class="progressBalance">${summary.used} GB</div>
                            </div>
                        </div>
                        <div class="col ">
                            <div class="d-flex justify-content-center">
                                <div class="progressType">${dataType} Data</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="d-flex justify-content-end">
                                <div class="progressBalance">${summary.remain} GB</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="progress">
                                <div class="progress-bar " style="width: ${remainPercent}%;">${remainPercent}%</div>
                            </div>

                        </div>
                    </div>
                    <div class="row ">
                        <div class="col">
                            <div class="d-flex justify-content-start">
                                <div class="quota">${summary.currentDailyQuota}</div>
                            </div>
                        </div>
                        <div class="col ">
                            <div class="d-flex justify-content-center">
                                <div class="quotaGreen">${summary.dailyQuota}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="d-flex justify-content-end">
                                <div class="quota">${summary.remainDailyQuota}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}


export function vasBar(id, dataType, summary) {
    console.log("vasBar function called")

    const summaryWidget = document.getElementById(id);
    const remainPercent = summary.percentage;

    let htmlString = `<div">
            <div class="progressAreaBG" style="padding-bottom: 3%">
                <div class="progressArea">
                    <div class="row ">
                        <div class="col">
                            <div class="d-flex justify-content-start">
                                <div class="progressBalance">${summary.used} GB</div>
                            </div>
                        </div>
                        <div class="col ">
                            <div class="d-flex justify-content-center">
                                <div class="progressType">${dataType}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="d-flex justify-content-end">
                                <div class="progressBalance">${summary.remain} GB</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="progress">
                                <div class="progress-bar " style="width: ${remainPercent}%;">${remainPercent}%</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    </div>`;

    summaryWidget.insertAdjacentHTML('beforeend', htmlString);
}


