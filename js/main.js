// 레퍼럴 코드 → 가입 링크에 mb_recommender 반영
function applyRefToButtons(ref){
  document.querySelectorAll("a[data-ref]").forEach(a=>{
    a.href = "https://firstname-ai.com/member/login.php?mb_recommender=" + encodeURIComponent(ref);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');

  // URL에 ref가 있으면 바로 적용
  if(ref){
    applyRefToButtons(ref);
    const resultBox = document.getElementById("refResult");
    if(resultBox){
      const myLink = window.location.origin + window.location.pathname + "?ref=" + ref;
      resultBox.innerHTML = `
        <p>URL에 포함된 레퍼럴 코드: <strong>${ref}</strong></p>
        <p>이 주소를 다른 사람에게 보내면,</p>
        <p><code>mb_recommender=${ref}</code>로 가입이 진행됩니다.</p>
        <p style="margin-top:6px;font-size:14px;">공유 링크: <br><strong>${myLink}</strong></p>
      `;
    }
  }

  // 상단 "레퍼럴 코드 설정" 버튼 동작
  const openRefBtn = document.getElementById("openRefModal");
  const refModal = document.getElementById("refModal");
  if(openRefBtn && refModal){
    openRefBtn.addEventListener("click",(e)=>{
      e.preventDefault();
      refModal.style.display = "flex";
    });
  }
});

// 모달 닫기
function closeRefModal(){
  document.getElementById("refModal").style.display = "none";
}

// 모달에서 코드 입력 후 적용
function applyRef(){
  const input = document.getElementById("refInput");
  const code = input.value.trim();
  const resultBox = document.getElementById("refResult");
  if(!code){
    resultBox.innerHTML = "<p style='color:#b91c1c;'>추천코드를 입력하세요.</p>";
    return;
  }

  // 버튼들에 적용
  applyRefToButtons(code);

  // 공유 링크 생성
  const myLink = window.location.origin + window.location.pathname + "?ref=" + code;
  resultBox.innerHTML = `
    <p>설정된 레퍼럴 코드: <strong>${code}</strong></p>
    <p>아래 링크를 복사해서 다른 사람에게 전달하세요.</p>
    <p style="margin-top:6px;font-size:14px;"><strong>${myLink}</strong></p>
  `;
}
