// 레퍼럴 코드 → 가입 링크에 mb_recommender 반영
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if(ref){
    document.querySelectorAll('a[data-ref]').forEach(a => {
      a.href = 'https://firstname-ai.com/member/login.php?mb_recommender=' + encodeURIComponent(ref);
    });
  }
});

// 보상 플랜 계산기
function calcReward(){
  const pkg = Number(document.getElementById('pkg').value);
  let low = 0, high = 0;
  if(pkg === 3000){ low = 800; high = 1200; }
  if(pkg === 10000){ low = 1800; high = 3000; }
  if(pkg === 20000){ low = 3000; high = 5000; }

  const directAmount = Number(document.getElementById('direct').value || 0);
  const left = Number(document.getElementById('leftVol').value || 0);
  const right = Number(document.getElementById('rightVol').value || 0);

  const directBonus = directAmount * 0.10;
  const binaryBonus = Math.min(left, right) * 0.08;

  let rank = '해당 없음', rankBonus = 0;
  if(left>=5000 && right>=5000){rank='STAR1'; rankBonus=300;}
  if(left>=20000 && right>=20000){rank='STAR2'; rankBonus=500;}
  if(left>=50000 && right>=50000){rank='STAR3'; rankBonus=1000;}
  if(left>=500000 && right>=500000){rank='STAR9'; rankBonus=50000;}
  if(left>=1000000 && right>=1000000){rank='STAR10'; rankBonus=100000;}

  const total = directBonus + binaryBonus + rankBonus;

  document.getElementById('calcResult').innerHTML = `
    <h3 style="font-size:18px;margin-bottom:8px;">계산 결과</h3>
    선택 패키지: $${pkg}<br>
    월 예상 배당: $${low} ~ $${high}<br><br>
    추천 보너스 (10%): $${directBonus.toFixed(2)}<br>
    바이너리 보너스 (8%): $${binaryBonus.toFixed(2)}<br>
    랭크 달성: ${rank} (${rankBonus})<br><br>
    <strong>총 예상 보상 합계: $${total.toFixed(2)}</strong>
  `;
}
