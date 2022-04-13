<template>
  <div id="request">

    <div class="template__Wrapper ">
      <div class="container">
        <h2 class="h2">資料請求者情報の入力</h2>
        <div class="">

          <section class="menu__Wrapper">
            <h3 class="h3" id="project_name">
            </h3>
          </section>
          <form method="post" action="" class="" id="form">

          <p id="counter__Wrapper" class="counter__Wrapper for-pc">
            あと<br><span id="counter">12</span>項目
          </p>

          <table class="formTable">
          <tbody>
            <component v-for="(comp , idx) in myform" :key="idx" :is="getComp(comp.type)" :form="myform[idx]"></component>

<!-- HERE -->
          <!-- <tr class="tr flex align-center">
            <th class="th"><label for="address2">都道府県</label><span class="hissu">必須</span></th>
            <td class="td select">
              <select name="都道府県" id="address2" class="validate[required]"  data-prompt-position="topLeft:40">
              <option value="" >選択してください</option>
              <option value="北海道" >北海道</option>
              <option value="青森県" >青森県</option>
              <option value="岩手県" >岩手県</option>
              <option value="宮城県" >宮城県</option>
              <option value="秋田県" >秋田県</option>
              <option value="山形県" >山形県</option>
              <option value="福島県" >福島県</option>
              <option value="茨城県" >茨城県</option>
              <option value="栃木県" >栃木県</option>
              <option value="群馬県" >群馬県</option>
              <option value="埼玉県" >埼玉県</option>
              <option value="千葉県" >千葉県</option>
              <option value="東京都" >東京都</option>
              <option value="神奈川県" >神奈川県</option>
              <option value="新潟県" >新潟県</option>
              <option value="富山県" >富山県</option>
              <option value="石川県" >石川県</option>
              <option value="福井県" >福井県</option>
              <option value="山梨県" >山梨県</option>
              <option value="長野県" >長野県</option>
              <option value="岐阜県" >岐阜県</option>
              <option value="静岡県" >静岡県</option>
              <option value="愛知県" >愛知県</option>
              <option value="三重県" >三重県</option>
              <option value="滋賀県" >滋賀県</option>
              <option value="京都府" >京都府</option>
              <option value="大阪府" >大阪府</option>
              <option value="兵庫県" >兵庫県</option>
              <option value="奈良県" >奈良県</option>
              <option value="和歌山県" >和歌山県</option>
              <option value="鳥取県" >鳥取県</option>
              <option value="島根県" >島根県</option>
              <option value="岡山県" >岡山県</option>
              <option value="広島県" >広島県</option>
              <option value="山口県" >山口県</option>
              <option value="徳島県" >徳島県</option>
              <option value="香川県" >香川県</option>
              <option value="愛媛県" >愛媛県</option>
              <option value="高知県" >高知県</option>
              <option value="福岡県" >福岡県</option>
              <option value="佐賀県" >佐賀県</option>
              <option value="長崎県" >長崎県</option>
              <option value="熊本県" >熊本県</option>
              <option value="大分県" >大分県</option>
              <option value="宮崎県" >宮崎県</option>
              <option value="鹿児島県" >鹿児島県</option>
              <option value="沖縄県" >沖縄県</option>
            </select>
            <span class="select-icon"><i class="fas fa-caret-down"></i></span>
            </td>
          </tr> -->

          </tbody>
          </table>

          <p id="anquate" class="anquate">よろしければアンケートにお答えください。<span class="hissu">アンケートに答える</span></p>

          <div class="anquate-table">
            <table class="formTable">
              <tbody>
        
              <tr class="tr flex ">
                <th class="th">
                  <label for="HopeType" class="form-label">ご希望の住まい（複数選択可）</label>
                </th>
                <td class="td checkbox flex flex-wrap">
                  <label for="type0"><input name="HopeTypeExample" value="新築マンション" type="checkbox" id="type0" class="HopeTypeExample form-control">新築マンション</label>
                  <label for="type1"><input name="HopeTypeExample" value="新築一戸建て" type="checkbox" id="type1" class="HopeTypeExample form-control">新築一戸建て</label>
                  <label for="type2"><input name="HopeTypeExample" value="中古マンション" type="checkbox" id="type2" class="HopeTypeExample form-control">中古マンション</label>
                  <label for="type3"><input name="HopeTypeExample" value="中古一戸建て" type="checkbox" id="type3" class="HopeTypeExample form-control">中古一戸建て</label>
                  <label for="type4"><input name="HopeTypeExample" value="賃貸" type="checkbox" id="type4" class="HopeTypeExample form-control">賃貸</label>
                  <label for="type5"><input name="HopeTypeExample" value="その他" type="checkbox" id="type5" class="HopeTypeExample form-control">その他</label>
                </td>
              </tr>

              <tr class="tr flex ">
                <th class="th">
                  <label for="HopePlan" class="form-label">希望の間取り（複数選択可）</label>
                </th>
                <td class="td checkbox flex flex-wrap">
                  <label for="plan0"><input name="HopePlanExample" value="ワンルーム・1K" type="checkbox" id="plan0" class="HopePlanExample form-control">ワンルーム・1K</label>
                  <label for="plan1"><input name="HopePlanExample" value="1DK" type="checkbox" id="plan1" class="HopePlanExample form-control">1DK</label>
                  <label for="plan2"><input name="HopePlanExample" value="1LDK" type="checkbox" id="plan2" class="HopePlanExample form-control">1LDK</label>
                  <label for="plan3"><input name="HopePlanExample" value="2DK" type="checkbox" id="plan3" class="HopePlanExample form-control">2DK</label>
                  <label for="plan4"><input name="HopePlanExample" value="2LDK" type="checkbox" id="plan4" class="HopePlanExample form-control">2LDK</label>
                  <label for="plan5"><input name="HopePlanExample" value="3DK" type="checkbox" id="plan5" class="HopePlanExample form-control">3DK</label>
                  <label for="plan6"><input name="HopePlanExample" value="3LDK" type="checkbox" id="plan6" class="HopePlanExample form-control">3LDK</label>
                  <label for="plan7"><input name="HopePlanExample" value="4DK" type="checkbox" id="plan7" class="HopePlanExample form-control">4DK</label>
                  <label for="plan8"><input name="HopePlanExample" value="4LDK" type="checkbox" id="plan8" class="HopePlanExample form-control">4LDK</label>
                  <label for="plan9"><input name="HopePlanExample" value="その他" type="checkbox" id="plan9" class="HopePlanExample form-control">その他</label>
                </td>
              </tr>

              <tr class="tr flex ">
                <th class="th">
                  <label for="HopeBreadthLower" class="form-label">ご希望の広さ（2つまで選択）</label>
                </th>
                <td class="td checkbox flex flex-wrap">
                  <label for="width0"><input name="HopeBreadthLowerExample" value="〜30㎡台" type="checkbox" id="width0" class="HopeBreadthLowerExample form-control">〜30㎡台</label>
                  <label for="width1"><input name="HopeBreadthLowerExample" value="40㎡台" type="checkbox" id="width1" class="HopeBreadthLowerExample form-control">40㎡台</label>
                  <label for="width2"><input name="HopeBreadthLowerExample" value="50㎡台" type="checkbox" id="width2" class="HopeBreadthLowerExample form-control">50㎡台</label>
                  <label for="width3"><input name="HopeBreadthLowerExample" value="60㎡台" type="checkbox" id="width3" class="HopeBreadthLowerExample form-control">60㎡台</label>
                  <label for="width4"><input name="HopeBreadthLowerExample" value="70㎡台" type="checkbox" id="width4" class="HopeBreadthLowerExample form-control">70㎡台</label>
                  <label for="width5"><input name="HopeBreadthLowerExample" value="80㎡台" type="checkbox" id="width5" class="HopeBreadthLowerExample form-control">80㎡台</label>
                  <label for="width6"><input name="HopeBreadthLowerExample" value="90㎡台" type="checkbox" id="width6" class="HopeBreadthLowerExample form-control">90㎡台</label>
                  <label for="width7"><input name="HopeBreadthLowerExample" value="100㎡台〜" type="checkbox" id="width7" class="HopeBreadthLowerExample form-control">100㎡台〜</label>
                </td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="Budget">ご予算</label></th>
                <td class="td select">
                  <select id="Budget" name="Budget" class="form-control">
                    <option value="">お選びください</option>
                    <option value="〜2,500万円">〜2,500万円</option>
                    <option value="2,500万円〜3,000万円">2,500万円〜3,000万円</option>
                    <option value="3,000万円〜3,500万円">3,000万円〜3,500万円</option>
                    <option value="3,500万円〜4,000万円">3,500万円〜4,000万円</option>
                    <option value="4,000万円〜4,500万円">4,000万円〜4,500万円</option>
                    <option value="4,500万円〜5,000万円">4,500万円〜5,000万円</option>
                    <option value="5,000万円〜5,500万円">5,000万円〜5,500万円</option>
                    <option value="5,500万円〜6,000万円">5,500万円〜6,000万円</option>
                    <option value="6,000万円〜6,500万円">6,000万円〜6,500万円</option>
                    <option value="6,500万円〜7,000万円">6,500万円〜7,000万円</option>
                    <option value="7,000万円〜7,500万円">7,000万円〜7,500万円</option>
                    <option value="7,500万円〜8,000万円">7,500万円〜8,000万円</option>
                    <option value="8,000万円〜8,500万円">8,000万円〜8,500万円</option>
                    <option value="8,500万円〜9,000万円">8,500万円〜9,000万円</option>
                    <option value="9,000万円〜">9,000万円〜</option>
                </select>
                <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="NumberOfPeople">ご家族（ご入居予定者数）</label></th>
                <td class="td select">
                  <select id="NumberOfPeople" name="NumberOfPeople" class="form-control">
                    <option value="">お選びください</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="その他">その他</option>
                </select>
                <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>

              <tr class="tr flex ">
                <th class="th">
                  <label for="TenantsProspective" class="form-label">ご家族</label>
                </th>
                <td class="td checkbox flex flex-wrap">
                  <label for="peple0"><input name="TenantsProspectiveExample" value="ご本人" type="checkbox" id="peple0" class="TenantsProspectiveExample form-control">ご本人</label>
                  <label for="peple1"><input name="TenantsProspectiveExample" value="配偶者（婚約者）" type="checkbox" id="peple1" class="TenantsProspectiveExample form-control">配偶者（婚約者）</label>
                  <label for="peple2"><input name="TenantsProspectiveExample" value="父" type="checkbox" id="peple2" class="TenantsProspectiveExample form-control">父</label>
                  <label for="peple3"><input name="TenantsProspectiveExample" value="母" type="checkbox" id="peple3" class="TenantsProspectiveExample form-control">母</label>
                  <label for="peple4"><input name="TenantsProspectiveExample" value="孫" type="checkbox" id="peple4" class="TenantsProspectiveExample form-control">孫</label>
                  <label for="peple6"><input name="TenantsProspectiveExample" value="子供" type="checkbox" id="peple6" class="TenantsProspectiveExample form-control">子供</label>
                  <label for="peple5"><input name="TenantsProspectiveExample" value="その他" type="checkbox" id="peple5" class="TenantsProspectiveExample form-control">その他</label>
                </td>
              </tr>

              <tr class="tr flex align-center flex-wrap">
                <th class="th consider"><label for="Consider">ご検討の理由（上位3つ）</label></th>
                <td class="td select consider">
                  <p class="consider-num">1番目</p>
                  <select id="Consider" name="Consider" class="form-control">
                    <option value="">お選びください</option>
                    <option value="住宅が狭くなった">住宅が狭くなった</option>
                    <option value="住宅が古くなった">住宅が古くなった</option>
                    <option value="環境が悪い">環境が悪い</option>
                    <option value="ローン・家賃の問題">ローン・家賃の問題</option>
                    <option value="通勤・通学に不便">通勤・通学に不便</option>
                    <option value="転勤">転勤</option>
                    <option value="結婚（本人）">結婚（本人）</option>
                    <option value="結婚（子供）">結婚（子供）</option>
                    <option value="子供の進学">子供の進学</option>
                    <option value="世帯分離">世帯分離</option>
                    <option value="立退要求">立退要求</option>
                    <option value="持家希望">持家希望</option>
                    <option value="子供の将来のため">子供の将来のため</option>
                    <option value="親のため">親のため</option>
                    <option value="セカンドハウス">セカンドハウス</option>
                    <option value="投資">投資</option>
                    <option value="その他">その他</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>
              <tr class="tr flex align-center flex-wrap">
                <th class="th"><label for="Consider"></label></th>
                <td class="td select consider">
                  <p class="consider-num">2番目</p>
                  <select id="Consider2" name="Consider2" class="form-control">
                    <option value="">お選びください</option>
                    <option value="住宅が狭くなった">住宅が狭くなった</option>
                    <option value="住宅が古くなった">住宅が古くなった</option>
                    <option value="環境が悪い">環境が悪い</option>
                    <option value="ローン・家賃の問題">ローン・家賃の問題</option>
                    <option value="通勤・通学に不便">通勤・通学に不便</option>
                    <option value="転勤">転勤</option>
                    <option value="結婚（本人）">結婚（本人）</option>
                    <option value="結婚（子供）">結婚（子供）</option>
                    <option value="子供の進学">子供の進学</option>
                    <option value="世帯分離">世帯分離</option>
                    <option value="立退要求">立退要求</option>
                    <option value="持家希望">持家希望</option>
                    <option value="子供の将来のため">子供の将来のため</option>
                    <option value="親のため">親のため</option>
                    <option value="セカンドハウス">セカンドハウス</option>
                    <option value="投資">投資</option>
                    <option value="その他">その他</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>
              <tr class="tr flex align-center flex-wrap">
                <th class="th"><label for="Consider"></label></th>
                <td class="td select consider">
                  <p class="consider-num">3番目</p>
                  <select id="Consider3" name="Consider3" class="form-control">
                    <option value="">お選びください</option>
                    <option value="住宅が狭くなった">住宅が狭くなった</option>
                    <option value="住宅が古くなった">住宅が古くなった</option>
                    <option value="環境が悪い">環境が悪い</option>
                    <option value="ローン・家賃の問題">ローン・家賃の問題</option>
                    <option value="通勤・通学に不便">通勤・通学に不便</option>
                    <option value="転勤">転勤</option>
                    <option value="結婚（本人）">結婚（本人）</option>
                    <option value="結婚（子供）">結婚（子供）</option>
                    <option value="子供の進学">子供の進学</option>
                    <option value="世帯分離">世帯分離</option>
                    <option value="立退要求">立退要求</option>
                    <option value="持家希望">持家希望</option>
                    <option value="子供の将来のため">子供の将来のため</option>
                    <option value="親のため">親のため</option>
                    <option value="セカンドハウス">セカンドハウス</option>
                    <option value="投資">投資</option>
                    <option value="その他">その他</option>
                </select>
                <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="Birth">生年月日</label></th>
                <td class="td select Birth flex align-center">
                  <select id="BirthY" name="BirthY" class="form-control">
                      <option value="">---</option>
                      <option value="1901">1901</option>
                      <option value="1902">1902</option>
                      <option value="1903">1903</option>
                      <option value="1904">1904</option>
                      <option value="1905">1905</option>
                      <option value="1906">1906</option>
                      <option value="1907">1907</option>
                      <option value="1908">1908</option>
                      <option value="1909">1909</option>
                      <option value="1910">1910</option>
                      <option value="1911">1911</option>
                      <option value="1912">1912</option>
                      <option value="1913">1913</option>
                      <option value="1914">1914</option>
                      <option value="1915">1915</option>
                      <option value="1916">1916</option>
                      <option value="1917">1917</option>
                      <option value="1918">1918</option>
                      <option value="1919">1919</option>
                      <option value="1920">1920</option>
                      <option value="1921">1921</option>
                      <option value="1922">1922</option>
                      <option value="1923">1923</option>
                      <option value="1924">1924</option>
                      <option value="1925">1925</option>
                      <option value="1926">1926</option>
                      <option value="1927">1927</option>
                      <option value="1928">1928</option>
                      <option value="1929">1929</option>
                      <option value="1930">1930</option>
                      <option value="1931">1931</option>
                      <option value="1932">1932</option>
                      <option value="1933">1933</option>
                      <option value="1934">1934</option>
                      <option value="1935">1935</option>
                      <option value="1936">1936</option>
                      <option value="1937">1937</option>
                      <option value="1938">1938</option>
                      <option value="1939">1939</option>
                      <option value="1940">1940</option>
                      <option value="1941">1941</option>
                      <option value="1942">1942</option>
                      <option value="1943">1943</option>
                      <option value="1944">1944</option>
                      <option value="1945">1945</option>
                      <option value="1946">1946</option>
                      <option value="1947">1947</option>
                      <option value="1948">1948</option>
                      <option value="1949">1949</option>
                      <option value="1950">1950</option>
                      <option value="1951">1951</option>
                      <option value="1952">1952</option>
                      <option value="1953">1953</option>
                      <option value="1954">1954</option>
                      <option value="1955">1955</option>
                      <option value="1956">1956</option>
                      <option value="1957">1957</option>
                      <option value="1958">1958</option>
                      <option value="1959">1959</option>
                      <option value="1960">1960</option>
                      <option value="1961">1961</option>
                      <option value="1962">1962</option>
                      <option value="1963">1963</option>
                      <option value="1964">1964</option>
                      <option value="1965">1965</option>
                      <option value="1966">1966</option>
                      <option value="1967">1967</option>
                      <option value="1968">1968</option>
                      <option value="1969">1969</option>
                      <option value="1970">1970</option>
                      <option value="1971">1971</option>
                      <option value="1972">1972</option>
                      <option value="1973">1973</option>
                      <option value="1974">1974</option>
                      <option value="1975">1975</option>
                      <option value="1976">1976</option>
                      <option value="1977">1977</option>
                      <option value="1978">1978</option>
                      <option value="1979">1979</option>
                      <option value="1980">1980</option>
                      <option value="1981">1981</option>
                      <option value="1982">1982</option>
                      <option value="1983">1983</option>
                      <option value="1984">1984</option>
                      <option value="1985">1985</option>
                      <option value="1986">1986</option>
                      <option value="1987">1987</option>
                      <option value="1988">1988</option>
                      <option value="1989">1989</option>
                      <option value="1990">1990</option>
                      <option value="1991">1991</option>
                      <option value="1992">1992</option>
                      <option value="1993">1993</option>
                      <option value="1994">1994</option>
                      <option value="1995">1995</option>
                      <option value="1996">1996</option>
                      <option value="1997">1997</option>
                      <option value="1998">1998</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                  <span class="unit sp_w20">年</span>
                </td>
                
                <td class="td select Birth flex align-center">
                  <select id="BirthM" name="BirthM" class="form-control">
                      <option value="">---</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                  <span class="unit sp_w20">月</span>
                </td>

                <td class="td select Birth flex align-center">
                  <select id="BirthD" name="BirthD" class="form-control">
                      <option value="">---</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                  <span class="unit sp_w20">日</span>
                </td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="Newspaper">ご購読新聞</label></th>
                <td class="td select Newspaper">
                  <select id="Newspaper" name="Newspaper" class="form-control" >
                    <option value="">お選びください</option>
                    <option value="読売新聞">読売新聞</option>
                    <option value="朝日新聞">朝日新聞</option>
                    <option value="毎日新聞">毎日新聞</option>
                    <option value="西日本新聞">西日本新聞</option>
                    <option value="中国新聞">中国新聞</option>
                    <option value="産経新聞">産経新聞</option>
                    <option value="日経新聞">日経新聞</option>
                    <option value="京都新聞">京都新聞</option>
                    <option value="神戸新聞">神戸新聞</option>
                    <option value="中日新聞">中日新聞</option>
                    <option value="その他">その他</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
                
                <td class="td select Newspaper">
                  <select id="NewspaperMethod" name="NewspaperMethod" class="form-control">
                    <option value="">講読方法</option>
                    <option value="紙面">紙面</option>
                    <option value="電子版">電子版</option>
                    <option value="紙面・電子版両方">紙面・電子版両方</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="Occupation">ご職業</label></th>
                <td class="td select">
                  <select id="Occupation" name="Occupation" class="form-control">
                    <option value="">お選びください</option>
                    <option value="会社員">会社員</option>
                    <option value="公務員">公務員</option>
                    <option value="会社役員">会社役員</option>
                    <option value="団体役員">団体役員</option>
                    <option value="法人代表（会社経営）">法人代表（会社経営）</option>
                    <option value="医師（勤務医）">医師（勤務医）</option>
                    <option value="医師（開業医）">医師（開業医）</option>
                    <option value="弁護士">弁護士</option>
                    <option value="会計士・税理士">会計士・税理士</option>
                    <option value="自営業">自営業</option>
                    <option value="契約社員">契約社員</option>
                    <option value="派遣社員">派遣社員</option>
                    <option value="パート・アルバイト">パート・アルバイト</option>
                    <option value="主婦">主婦</option>
                    <option value="年金生活">年金生活</option>
                    <option value="無職">無職</option>
                    <option value="その他">その他</option>
                  </select>
                <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="OccupationState">ご勤務地（都道府県）</label></th>
                <td class="td select">
                  <select id="OccupationState" class="OccupationState" name="OccupationState">
                    <option value="北海道">北海道</option>
                    <option value="青森県">青森県</option>
                    <option value="岩手県">岩手県</option>
                    <option value="宮城県">宮城県</option>
                    <option value="秋田県">秋田県</option>
                    <option value="山形県">山形県</option>
                    <option value="福島県">福島県</option>
                    <option value="茨城県">茨城県</option>
                    <option value="栃木県">栃木県</option>
                    <option value="群馬県">群馬県</option>
                    <option value="埼玉県">埼玉県</option>
                    <option value="千葉県">千葉県</option>
                    <option value="東京都">東京都</option>
                    <option value="神奈川県">神奈川県</option>
                    <option value="新潟県">新潟県</option>
                    <option value="富山県">富山県</option>
                    <option value="石川県">石川県</option>
                    <option value="福井県">福井県</option>
                    <option value="山梨県">山梨県</option>
                    <option value="長野県">長野県</option>
                    <option value="岐阜県">岐阜県</option>
                    <option value="静岡県">静岡県</option>
                    <option value="愛知県">愛知県</option>
                    <option value="三重県">三重県</option>
                    <option value="滋賀県">滋賀県</option>
                    <option value="京都府">京都府</option>
                    <option value="" selected>都道府県を選択</option>
                    <option value="大阪府">大阪府</option>
                    <option value="兵庫県">兵庫県</option>
                    <option value="奈良県">奈良県</option>
                    <option value="和歌山県">和歌山県</option>
                    <option value="鳥取県">鳥取県</option>
                    <option value="島根県">島根県</option>
                    <option value="岡山県">岡山県</option>
                    <option value="広島県">広島県</option>
                    <option value="山口県">山口県</option>
                    <option value="徳島県">徳島県</option>
                    <option value="香川県">香川県</option>
                    <option value="愛媛県">愛媛県</option>
                    <option value="高知県">高知県</option>
                    <option value="福岡県">福岡県</option>
                    <option value="佐賀県">佐賀県</option>
                    <option value="長崎県">長崎県</option>
                    <option value="熊本県">熊本県</option>
                    <option value="大分県">大分県</option>
                    <option value="宮崎県">宮崎県</option>
                    <option value="鹿児島県">鹿児島県</option>
                    <option value="沖縄県">沖縄県</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="OccupationCity">ご勤務地（市区町村）</label></th>
                <td class="td"><input id="OccupationCity" name="OccupationCity" placeholder="例）大阪市中央区" type="text" class="form-control"></td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="OccupationLine1">主なご利用沿線</label></th>
                <td class="td"><input id="OccupationLine1" name="OccupationLine1" placeholder="例）JR環状" type="text" class="form-control"></td>
                <td class="td2">線</td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="NearestStation">勤務地最寄り駅</label></th>
                <td class="td"><input id="NearestStation" name="NearestStation" placeholder="例）大阪城公園前" type="text" class="form-control"></td>
                <td class="td2">駅</td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="HouseForm">お住まいの形態（持家・賃貸）</label></th>
                <td class="td select">
                  <select id="HouseForm" name="HouseForm" class="form-control">
                    <option value="">お選びください</option>
                    <option value="持家">持家</option>
                    <option value="賃貸">賃貸</option>
                    <option value="親族持家">親族持家</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="CurrentType">現在のお住まい</label></th>
                <td class="td select">
                  <select id="CurrentType" name="CurrentType" class="form-control">
                    <option value="">お選びください</option>
                    <option value="戸建所有">戸建所有</option>
                    <option value="戸建借家">戸建借家</option>
                    <option value="マンション所有">マンション所有</option>
                    <option value="賃貸マンション">賃貸マンション</option>
                    <option value="社宅・官舎">社宅・官舎</option>
                    <option value="親族と同居">親族と同居</option>
                    <option value="その他">その他</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>

              <tr class="tr flex align-center">
                <th class="th"><label for="AnnualIncomeLast">前年度収入</label></th>
                <td class="td select">
                  <select id="AnnualIncomeLast" name="AnnualIncomeLast" class="form-control">
                    <option value="">お選びください</option>
                    <option value="〜300万円">〜300万円</option>
                    <option value="300万円〜400万円">300万円〜400万円</option>
                    <option value="400万円〜500万円">400万円〜500万円</option>
                    <option value="500万円〜600万円">500万円〜600万円</option>
                    <option value="600万円〜700万円">600万円〜700万円</option>
                    <option value="700万円〜800万円">700万円〜800万円</option>
                    <option value="800万円〜900万円">800万円〜900万円</option>
                    <option value="900万円〜1000万円">900万円〜1000万円</option>
                    <option value="1000万円〜1500万円">1000万円〜1500万円</option>
                    <option value="1500万円〜2000万円">1500万円〜2000万円</option>
                    <option value="2000万円〜">2000万円〜</option>
                  </select>
                  <span class="select-icon"><i class="fas fa-caret-down"></i></span>
                </td>
              </tr>

              </tbody>
            </table>
          </div>

          <p class="bottom_note">個人情報の取扱いについて<br>
            当サイトより取得した個人情報はプレサンスグループの<a href="https://pressance-jyuhan.co.jp/privacy-policy/">個人情報保護方針</a>に従い、適切な取扱いに努めてまいります。<br>
            個人情報保護法に定める例外事項を除き、ご本人の同意を得ることなく第三者に提供、開示いたしません。<br>
            ※このページはSSLを使った暗号化モードで表示されています。
          </p>


          <ul class="submit__Wrapper flex align-center justify-center">
            <li>
              <button type="submit" id="submit_button" >上記に同意の上、送信</button>
            </li>
          </ul>

          </form>
        </div> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, shallowRef } from "vue";
import { FormItem } from "@/types/Form";
import DynamicInput from "../components/DynamicInput.vue";
import Dropdown from "primevue/dropdown";
export default defineComponent({
  components: {
    DynamicInput
  },
  setup(){
    // const componentBasePath = "../components/"
    // const componentLookup: any = {
    //   "text": "DynamicInput"
    // }
    const myform: FormItem[] = [
      {
        "id": 2099918841,
        "label": "name1",
        "title": "お名前（姓）",
        "required": true,
        "type": "text",
        "hint": null,
        "placeholder": "青　空",
        "row": 1,
        "column": 1,
        "width": null,
        "form": 4250296260
      },
      {
        "id": 2099918841,
        "label": "name2",
        "title": "お名前（名）",
        "required": true,
        "type": "text",
        "hint": null,
        "placeholder": "花　子",
        "row": 1,
        "column": 1,
        "width": null,
        "form": 4250296261
      },
      {
        "id": 2099918841,
        "label": "fname1",
        "title": "フリガナ（セイ）",
        "required": true,
        "type": "text",
        "hint": "（全角カタカナ）",
        "placeholder": "アオゾラ",
        "row": 1,
        "column": 1,
        "width": null,
        "form": 4250296262
      },
      {
        "id": 2099918841,
        "label": "fname2",
        "title": "フリガナ（メイ）",
        "required": true,
        "type": "text",
        "hint": "（全角カタカナ）",
        "placeholder": "ハナコ",
        "row": 1,
        "column": 1,
        "width": null,
        "form": 4250296262
      },
      {
        "id": 2099918841,
        "label": "email",
        "title": "メールアドレス",
        "required": true,
        "type": "text",
        "hint": "（全角カタカナ）",
        "placeholder": "Taro@aozora.com",
        "row": 1,
        "column": 1,
        "width": "40%",
        "form": 4250296263
      },
      {
        "id": 2099918842,
        "label": "tel",
        "title": "電話番号",
        "required": true,
        "type": "text",
        "hint": "（半角数字/ハイフンなし）",
        "placeholder": "090-1234-5678",
        "row": 1,
        "column": 1,
        "width": null,
        "form": 4250296263
      },
      {
        "id": 2099918843,
        "label": "address2",
        "title": "郵便番号",
        "required": true,
        "type": "text",
        "hint": "（半角数字/ハイフンなし）",
        "placeholder": "1006640",
        "row": 1,
        "column": 1,
        "width": null,
        "form": 4250296263
      },
      {
        "id": 2099918844,
        "label": "address2",
        "title": "都道府県",
        "required": true,
        "type": "select",
        "hint": null,
        "placeholder": "選択して下さい",
        "options": [
          {label: "大阪", value: "大阪"},
          {label: "北海道", value: "北海道"}
        ],
        "row": 1,
        "column": 1,
        "width": null,
        "form": 4250296263
      },
      {
        "id": 2099918843,
        "label": "address3",
        "title": "市区町村",
        "required": true,
        "type": "text",
        "hint": null,
        "placeholder": null,
        "row": 1,
        "column": 1,
        "width": "40%",
        "form": 4250296263
      },
      {
        "id": 2099918843,
        "label": "address4",
        "title": "丁目番地",
        "required": true,
        "type": "text",
        "hint": null,
        "placeholder": null,
        "row": 1,
        "column": 1,
        "width": "40%",
        "form": 4250296263
      },
      {
        "id": 2099918843,
        "label": "address5",
        "title": "建物名部屋番号",
        "required": true,
        "type": "text",
        "hint": null,
        "placeholder": null,
        "row": 1,
        "column": 1,
        "width": "40%",
        "form": 4250296263
      },
            {
        "id": 2099918844,
        "label": "mailmagazine",
        "title": "メールマガジンを<br>購読する",
        "required": true,
        "type": "radio",
        "hint": null,
        "placeholder": null,
        "options": [
          {label: "希望する", value: "希望する"},
          {label: "希望しない", value: "希望しない"}
        ],
        "row": 1,
        "column": 1,
        "width": null,
        "form": 4250296263
      },
    ]
    const textComp = shallowRef<object | null>(null)
    const selectComp = shallowRef<object | null>(null)
    const checkComp = shallowRef<object | null>(null)
    const radioComp = shallowRef<object | null>(null)

    import("../components/DynamicInput.vue").then(val => {
      textComp.value = val.default;
    })
    import("../components/DynamicSelect.vue").then(val => {
      selectComp.value = val.default;
    })
    import("../components/DynamicRadio.vue").then(val => {
      radioComp.value = val.default;
    })
    const getComp = (name: string) => {
      if (name === 'text'){
        return textComp.value
      }else if (name === 'select'){
        return selectComp.value
      }else if (name === 'radio'){
        return radioComp.value
      }else{
        return textComp.value
      }
    }
    return {
      myform,
      getComp
    }
  }

})
</script>

<style>
@charset "UTF-8";

/*--------------------------------
reset
--------------------------------*/
html,body,div,p,img,iframe,a,span,blockquote,q,address,cite,
pre,code,em,small,strong,b,i,
header,article,section,nav,figure,figcaption,hgroup,menu,aside,footer,time,
h1,h2,h3,h4,h5,h6,
ul,ol,li,dl,dt,dd,
table,tbody,thead,tfoot,th,tr,td,
form,fieldset,legend,label,select,input,textarea,button{
    margin: 0;
    padding: 0;
    border: 0;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: baseline;
}
header,article,section,nav,figure,figcaption,hgroup,menu,aside,footer{
    display: block;
}
ul li{
    list-style-type: none;
}
h1,h2,h3,h4,h5,h6{
    font-weight: 500;
}
body{
    line-height: 1;
}
a{
    text-decoration: none;
    color: #555;
}
p{
    line-height: 1.5;
}
img{
    vertical-align: middle;
    width: 100%;
}
table{
    border-collapse: collapse;
    border-spacing: 0;
}
select,option,input,textarea,button{
    font: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
}
input[type=radio]{
    -webkit-appearance: radio;
    -moz-appearance: radio;
    appearance: radio;
}
input[type=checkbox]{
    -webkit-appearance: checkbox;
    -moz-appearance: checkbox;
    appearance: checkbox;
}
blockquote::before,blockquote::after,q::before,q::after{
    content: '';
    content: none;
}
[type=submit],[type=button],[type=reset],[type=file],button{
    cursor: pointer;
}
:focus{
    outline: none;
}

/*--------------------------------
common
--------------------------------*/
html{
    font-size: 0.625rem;
    overflow-x: hidden;
}
body{
    font-family: 'Avenir Next','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3','Meiryo','メイリオ',sans-serif;
    font-size: 1.4rem;
    line-height: 1.5;
    color: #555;
}
.flex {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.justify-center {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.justify-between {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.align-center {
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.column {
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}
.flex-wrap{
    -webkit-flex-wrap: wrap;          /* Safari etc. */
    -ms-flex-wrap    : wrap;          /* IE10        */
    flex-wrap        : wrap;
}

.container{
    max-width: 960px;
    margin: auto;
}
@media screen and (max-width: 900px) {
    .container{
        padding-top: 80px;
    }
}
@media screen and (max-width: 767px) {
    .container{
        padding-top: 50px;
        padding: 20px 10px;
    }
}

.for-pc {
    display: block ;
}
.for-sp {
    display: none ;
}
@media screen and (max-width: 767px) {
    .for-pc {
        display: none ;
    }
    .for-sp {
        display: block ;
    }
}

.h3 {
    font-size: 1.6rem;
    letter-spacing: .1rem;
    font-weight: 600;
    line-height: 1.5;
}
.p1 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    line-height: 1.3;
}
.p1 span {
    display: inline-block;
}
@media screen and (max-width: 767px) {
    .h3 {
        font-size: 1.6rem;
        letter-spacing: 0;
    }
    .p1 {
        font-size: 1.6rem;
    }
}



.header {
    padding: 3% 3% 1%;
    border-bottom: 3px solid #0052ad;
}
.header-logo {
    max-width: 140px;
}

main {
    display: block;
    width: 100%;
    background-color: #f5f5f5;
}

.template__Wrapper {
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 30px 0;
}


.template__Wrapper .container {
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    background-color: #fff;
    padding: 40px 60px;
}
@media screen and (max-width: 767px) {
    .template__Wrapper .container {
        padding: 20px 10px;
    }
}

.template__Wrapper .h2 {
    font-size: 24px;
    color: #00adef;
    letter-spacing: .1rem;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 2px solid #dadada;
}

.menu__Wrapper {
    margin: 20px auto 20px;
    border-bottom: 2px solid #dadada;
}

.menu__Wrapper .h3 {
    text-align: center;
    margin-bottom: 10px;
}
.menu__Wrapper .p1 {
    text-align: center;
}
.menu__Wrapper .menu__contents {
    padding-bottom: 10px;
}
.menu__Wrapper .menu__contents .list-item {
    display: block;
}

.footer {
    margin-bottom: 30px;
}

.footer .upper{
    width: 100%;
    padding: 30px 0;
    background: rgb(0,82,173);
    background: linear-gradient(90deg, rgba(0,82,173,1) 0%, rgba(29,153,185,1) 22%, rgba(0,82,173,1) 100%);
}
@media screen and (max-width: 767px)  {
    .footer .upper{
        padding: 15px 0;
    }
    .footer .upper .flex{
        display: block;
    }
}
.footer p{
    color: #fff;
}
.footer a{
    color: #fff;
}
.footer .footer-link li {
    margin-left: 20px;
}
@media screen and (max-width: 767px) {
    .footer .footer-link {
        margin-top: 20px;
    }
    .footer .footer-link li {
        margin-left: 0px;
    }
}
.footer .lower .ul {
    max-width: 670px;
    margin: 20px auto;
}
@media screen and (max-width: 767px) {
    .footer .lower .ul {
        display: block;
        margin: 0px auto;
    }
}
.footer .lower li {
    margin: 10px 15px;
}
@media screen and (max-width: 767px) {
    .footer .lower li:nth-of-type(2) img {
        width: 77%;
    }
}
.footer .copy {
    font-size: 1rem;
    color: #555;
    text-align: center;
}


.footer-hide {
    display: none;
}
.footer-hide.active {
    display: block;
}









/*--------------------------------
index
--------------------------------*/

#index #overlay {
    display: none;
}
#index #overlay.active {
    display: block;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.3);
}

#index .template__Wrapper {
    display: none;
}
#index .template__Wrapper.active {
    display: block;
}


#index .calendar__header {
    margin-bottom: 10px;
}
#index .calendar__header .title {
    font-size: 1.6rem;
    letter-spacing: .1rem;
    font-weight: 600;
    line-height: 1.5;
}
@media screen and (max-width: 767px) {
    #index .calendar__header .title {
        font-size: 1.2rem;
        font-weight: normal;
    }
}

#index .calendar__header .icon__Wrapper {
    width: 36px;
    height: 18px;
    margin: 2px 5px 0;
    padding: 0px;
    background: rgb(231,231,231);
    background: linear-gradient(90deg, rgba(231,231,231,1) 0%, rgba(236,236,236,1) 22%, rgba(255,255,255,1) 100%);
    border: 1px solid #b9b9b9;
    box-sizing: border-box;
    box-shadow: 1px 1px 2px 0px rgb(200 200 200);
    -webkit-box-shadow: 1px 1px 2px 0px rgb(200 200 200);
    -moz-box-shadow: 1px 1px 2px 0px rgb(200 200 200);
}
#index .calendar__header .icon__Wrapper .icon {
    width: 12px;
    height: 20px;
}
@media screen and (max-width: 767px) {
    #index .calendar__header .icon__Wrapper .icon {
        height: 14px;
    }
    #index .calendar__header {
        display: block;
    }
    #index .calendar__header h3 {
        text-align: center;
    }
    #index .calendar__header .week {
        margin: 20px auto 15px;
    }
}
#index .calendar__header .arrow {
    width: 30px;
    height: 30px;
    cursor: pointer;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    background-color: #fafafa;
}
#index .calendar__header .arrow.disable {
    opacity: 0.3;
    pointer-events: none;
}
#index .calendar__header span {
    margin: 0 10px;
}
@media screen and (max-width: 767px){
    #index .calendar__header span {
        font-weight: bold;
        letter-spacing: .1rem;
    }
}
#index .calendar__header .prev img {
    width: 16px;
    height: 16px;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
}
#index .calendar__header .next img {
    width: 16px;
    height: 16px;
    -webkit-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    transform: rotate(270deg);
}



/* #index .calendar__contents {} */
#index .calendar__contents .ul {
    border: 1px solid #ddd;
    border-right: none;
}

#index .week-cell__Wrapper {
    width: calc(100% / 7);
    border-right: 1px solid #ddd;
}
#index .week-cell__header {
    width: auto;
    height: 50px;
    line-height: 1.2;
    text-align: center;
    background-color: #f3f3f3;
    border-bottom: 1px solid #ddd;
}
#index .week-cell__header .day {
    font-size: 1.3rem;
    margin-bottom: 3px;
}
#index .week-cell__header.sata .day,
#index .week-cell__header.sata .date {
    color: #0052ad;
}
#index .week-cell__header.sun .day,
#index .week-cell__header.sun .date {
    color: red;
}
@media screen and (max-width: 767px) {
    #index .week-cell__header .day {
        font-size: 1.1rem;
    }
    #index .week-cell__header .date {
        font-size: 1.4rem;
    }
}
#index .week-cell__contents .sec {
    min-height: 70px;
    margin: 10px auto 20px;
    text-align: center;
}
#index .btn_select {
    cursor: pointer;
}
#index .btn_select.hidden {
    visibility: hidden;
}
#index .btn_select.disable {
    cursor:default;
}
@media screen and (max-width: 767px) {
    #index .week-cell__contents .sec {
        width: 100%;
        height: auto;
    }
}
#index .week-cell__contents .time {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    line-height: 1.3;
    margin-left: 5px;
}
@media screen and (max-width: 767px) {
    #index .week-cell__contents .time {
        text-align: center;
        font-size: 1.1rem;
    }
}
#index .week-cell__contents .time span {
    display: inline-block;
    text-align: left;
}
#index .week-cell__contents .icon__Wrapper {
    width: 80px;
    margin-bottom: 5px;
    padding: 5px 0 1px;
    background: rgb(231,231,231);
    background: linear-gradient(90deg, rgba(231,231,231,1) 0%, rgba(236,236,236,1) 22%, rgba(255,255,255,1) 100%);
    border: 1px solid #b9b9b9;
    box-sizing: border-box;
    box-shadow: 1px 1px 2px 0px rgb(200 200 200);
    -webkit-box-shadow: 1px 1px 2px 0px rgb(200 200 200);
    -moz-box-shadow: 1px 1px 2px 0px rgb(200 200 200);
}
@media screen and (max-width: 767px) {
    #index .week-cell__contents .icon__Wrapper {
        width: 80%;
        margin: 0 auto 5px;
    }
}
#index .week-cell__contents .icon__Wrapper.noflame {
    background: none;
    border: none;
    box-shadow: none;
}
#index .week-cell__contents .icon {
    width: 32px;
    height: 32px;
    margin: auto;
    text-align: center;
}
#index .week-cell__contents .icon.tel svg {
    width: 32px;
    height: 32px;
    margin: auto;
    color: #00adef;
}
#index .week-cell__contents .icon.circle svg {
    width: 24px;
    height: 24px;
    margin: 2px auto 0;
}
#index .week-cell__contents .icon.triangle svg {
    width: 24px;
    height: 24px;
    margin: 2px auto 0;
}
#index .week-cell__contents .icon.cross svg {
    width: 24px;
    height: 24px;
    margin: 2px auto 0;
}
#index .week-cell__contents .icon.bar svg {
    width: 24px;
    height: 24px;
    margin: 2px auto 0;
}

#index .calendar__contents .icon-list {
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    font-size: 1.2rem;
    font-weight: 300;
    margin: 10px 0 10px;
}
#index .calendar__contents .icon-list li {
    margin-left: 5px;
    color: #555;
}

#index .calendar__notice {
    margin-bottom: 40px;
}
#index .calendar__notice .list-item {
    display: block;
}
#index .definition__list {
    margin-bottom: 56px;
}
#index .definition__list .day {
    font-size: 1.6rem;
    border-bottom: 1px solid #ddd;
    line-height: 1.4;
    padding-top: 4px;
    padding-bottom: 4px;
}
#index .definition__list .day.sata span {
    color: #0052ad;
}
#index .definition__list .day.sun span {
    color: red;
}
#index .daily-booking__Wrapper {
    padding-top: 16px;
}
#index .daily-booking__list {
    border: 1px solid #c2c2c2;
    border-radius: 4px;
    box-shadow: 1px 2px 2px #c2c2c2;
    font-size: 1.6rem;
    line-height: 1.4;
    font-weight: 600;
    margin-bottom: 12px;
}
#index .daily-booking__list.hidden {
    display: none;
}
#index .daily-booking__button {
    height: 70px;
    width: 100%;
    font-size: 2.0rem;
    padding: 32px;
    box-sizing: border-box;
}
#index .daily-booking__button .icon{
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    margin-right: 12px;
    margin-right: 8px;
}
#index .daily-booking__button .icon svg {
    width: 26px;
    height: 26px;
    margin: auto;
    color: #00adef;
}




/*--------------------------------
request,reserve,confirm
--------------------------------*/
@media screen and (max-width: 767px) {
    .form_page  {
        font-size: 1.6rem;
    }
}
.form_page .template__Wrapper .container {
    padding: 40px 60px 40px 80px;
}
@media screen and (max-width: 767px) {
    .form_page .template__Wrapper .container {
        padding: 20px 15px;
    }
}

.form_page .menu__Wrapper {
    margin: 20px auto 20px;
    border-bottom: 2px solid #dadada;
}
.form_page .menu__Wrapper .h3 {
    font-weight: normal;
    text-align: left;
    margin-bottom: 10px;
    padding-bottom: 10px;
}
.form_page .menu__Wrapper .h3 span {
    color: #00adef;
    margin-right: 30px;
}


.form_page #form {
    position: relative;
}
.form_page #form .counter__Wrapper {
    position: absolute;
    top: 0;
    left: -90px;
    width: 75px;
    padding: 5px 0;
    border-radius: 5px;
    background-color: #00adef;
    text-align: center;
    color: #fff;
}


.formTable {
    text-align: left;
    width: 100%;
    margin: 40px auto;
}
tbody {
    display: block;
    width: 100%;
}
.formTable .tr {
    padding: 10px 0 10px;
    line-height: 1.5;
}
@media screen and (max-width: 767px) {
    .formTable .tr {
        display: block;
    }
}
#reserve_confirm .tr,
#request_confirm .tr {
    padding: 15px 0 8px;
    line-height: 1.5;
    border-bottom: 1px solid #ccc;
}
.formTable .th {
    display: block;
    width: 30%;
    font-weight: bold;
}
@media screen and (max-width: 767px) {
    .formTable .th {
        width: 100%;
    }
}
.formTable .th .hissu {
    color: #fff;
    font-size: .9rem;
    background-color: #ec5700;
    margin-left: 5px;
    padding: 2px 4px;
    border-radius: 3px;
    vertical-align: middle;
}
.formTable .td {
    display: block;
    width: 22%;
}
@media screen and (max-width: 767px) {
    .formTable .td {
        width: 100%;
        display: block;
        margin: 5px 0;
    }
}


.formTable .td2 {
    margin-left: 5px;
    color: #808080;
}
@media screen and (max-width: 767px) {
    .formTable .td2 {
        font-size: 1.4rem;
    }
}
.formTable .td.long {
    width: 40%;
}
.formTable .td.radio {
    width: 30%;
}
.formTable .td.w100{
    width: 70%;
}
@media screen and (max-width: 767px) {
    .formTable .td.long {
        width: 100%;
    }
    .formTable .td.radio {
        width: 70%;
    }
}

.formTable input[type=text], 
.formTable input[type=number], 
.formTable input[type="email"], 
.formTable input[type="tel"], 
.formTable textarea {
    padding: 8px;
    width: 100%;
    margin-right: 5%;
    font: inherit;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.formTable select {
    padding: 8px 20px 8px 10px;
    width: 100%;
    margin-right: 5%;
    font: inherit;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 5px;
}

.formTable .td.select {
    position: relative;
}
.formTable .td.select .select-icon {
    padding: 0 3px;
    height: 100%;
    z-index: 1;
    position: absolute;
    right: 0%;
    top: 0%;
    line-height: 40px;
    pointer-events: none;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    box-sizing: border-box;
    -webkit-border-top-right-radius: 5px;
    -webkit-border-bottom-right-radius: 5px;
    -moz-border-radius-topright: 5px;
    -moz-border-radius-bottomright: 5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
.formTable .td.checkbox  {
    width: 70%;
}
@media screen and (max-width: 767px) {
    .formTable .td.checkbox  {
        width: 100%;
    }
}
.formTable .td.checkbox  label{
    width: 40%;
    margin-bottom: 5px;
}
@media screen and (max-width: 767px) {
    .formTable .td.checkbox label {
        width: 45%;
        margin-bottom: 10px;
        margin-right: 10px;
        display: inline-block;
    }
}
.formTable .td.checkbox  input{
    margin-right: 5px;
}


#reserve .menu__Wrapper .menu__contents,
#reserve_confirm .menu__Wrapper .menu__contents {
    width: 70%;
}
#reserve .menu__contents dl,
#reserve_confirm .menu__contents dl {
    width: 100%;
    margin-bottom: 10px;
}
#reserve .menu__contents dt,
#reserve_confirm .menu__contents dt {
    font-weight: bold;
    width: 27%;
}
#reserve .menu__contents dd,
#reserve_confirm .menu__contents dd {
    width: 100%;
}
@media screen and (max-width: 767px) {
    #reserve .menu__Wrapper,
    #reserve_confirm .menu__Wrapper {
        display: block;
    }
    #reserve .menu__Wrapper .menu__contents,
    #reserve_confirm .menu__Wrapper .menu__contents {
        width: 100%;
    }
    #reserve .menu__contents dl,
    #reserve_confirm .menu__contents dl {
        display: block;
    }
    #reserve .menu__contents dt,
    #reserve_confirm .menu__contents dt {
        width: 100%;
    }
}



.form_page .bottom_note {
    font-size: 1.1rem;
    color: #808080;
    margin-bottom: 60px;
}
.form_page .bottom_note a {
    color: #0052ad;
    text-decoration: underline;
}

.form_page .submit__Wrapper {
    text-align: center;
    width: 100%;
}
.form_page .submit__Wrapper li{
    width: 33%;
    margin: 1%;
}
@media screen and (max-width: 767px) {
    .form_page .submit__Wrapper li{
        width: 47%;
        margin: 1%;
    }
}
.form_page .submit__Wrapper #goBack_button {
    width: 70%;
    background-color: #ccc;
    text-align: center;
    padding: 13px;
    border-radius: 6px;
    box-shadow: 2px 2px 0px 0px #989898;

}
.form_page .submit__Wrapper #submit_button {
    color: #fff;
    width: 100%;
    background-color: #00adef;
    text-align: center;
    padding: 13px;
    border-radius: 6px;
    box-shadow: 2px 2px 0px 0px #989898;
}



#request .anquate {
    font-weight: bold;
    margin-bottom: 30px;
}

#request .anquate span {
    color: #0052ad;
    font-weight: bold;
    display: inline-block;
    padding-left: 20px;
    margin-left: 20px;
    position: relative;
    border-bottom: 2px solid #0052ad;
    cursor: pointer;
}
@media screen and (max-width: 767px) {
    #request .anquate span {
        margin-left: 0px;
        margin-top: 5px;
    }
}

#request .anquate span::before {
    content: "";
    position: absolute;
    left: 0%;
    top: 2px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5.5px 0 5.5px 11px;
    border-color: transparent transparent transparent #459fff;
}

#request .anquate-table {
    display: none;
    padding-top: 20px;
    margin-bottom: 20px;
    border-top: 2px solid #dadada;
}
#request .anquate-table .formTable {
    margin: 0px auto 40px;
    /* background-color: #e0f2f9; */
}
#request .anquate-table tr {
    padding: 15px 0 15px;
    border-bottom: 1px solid #ccc;
}
#request .anquate-table .th.consider {
    margin-top: -20px;
}
#request .anquate-table .td.consider {
    margin-top: 20px;
}
#request .anquate-table .consider-num {
    position: absolute;
    top: -20px;
    left: 0;
}
#request .anquate-table td.Birth{
    width: 13%;
    margin-right: 30px;
}
@media screen and (max-width: 767px) {
    #request .anquate-table td.Birth {
        width: 50%;
        margin-right: 0px;
    }
}
#request .anquate-table td.Birth select{
    margin-right: 0;
}
#request .anquate-table td.Birth .unit{
    position: absolute;
    right: -20px;
}

#request .anquate-table td.Newspaper {
    margin-right: 20px;
}









/*--------------------------------
thanks
--------------------------------*/

#thanks h2 {
    margin-top: 100px;
    text-align: center;
}
#thanks h3 {
    margin-top: 50px;
    text-align: center;
}
#thanks .message__Wrapper {
    margin-bottom: 200px;
}
#thanks .message__Wrapper p {
    text-align: center;
    margin-top: 50px;
}
#thanks .message__Wrapper a {
    text-decoration: underline;
}






/*--------------------------------
detail
--------------------------------*/
#detail  .template__Wrapper {
    display: none;
}
#detail  .template__Wrapper.active {
    display: block;
}

#detail .formTable {
    display: none;
}
#detail .formTable.active {
    display: block;
}

#detail .menu__Wrapper.middle {
    padding: 10px 0 20px;
}
#detail .menu__Wrapper.middle .p1{
    text-align: left;
}

#detail .menu__Wrapper.lower {
    padding: 10px 0 20px;
    border-bottom: none;
}
#detail .menu__Wrapper.lower .p1{
    text-align: left;
}
#detail .menu__Wrapper.lower .list-item{
    display: block;
}
#detail .menu__Wrapper.lower ul {
    padding-left: 1em;
}
#detail .menu__Wrapper.lower li {
    list-style-type: initial;
}

#detail .reserve-contents__Wrapper {
    margin-top: 30px;
}
#detail .reserve-contents__Wrapper td.select{
    width: 100%;
}
#detail .reserve-contents__Wrapper .result-time{
    font-size: 1.8rem;
}
#detail .reserve-contents__Wrapper .result-time span{
    display: inline-block;
}

@media screen and (max-width: 767px) {
    #detail .reserve-contents__Wrapper .select-area {
        width: 20%;
        display: inline-block;
        margin-bottom: 16px;
    }
    #detail .formTable select {
        height: 40px;
        margin: 0;
    }
}

#detail .formTable {
    margin: 20px auto;
}
#detail .formTable .td.w100{
    width: 100%;
}
#detail .formTable .td.gray{
    color: #8e8e8e;
}

#detail .reserve-caution__title {
    font-weight: bold;
}
#detail .reserve-caution__table {
    margin: 10px auto 40px;
    border-bottom: 1px solid #aaa;
    border-collapse: collapse;
    table-layout: auto;
    table-layout: fixed;
}
#detail .reserve-caution__table .tr {
    padding: 0;
    border: 1px solid #aaa;
    border-left: none;
    border-bottom: none;
}
#detail .reserve-caution__table .tr:nth-child(even){
    background-color: rgb(240, 244, 255);
}
#detail .reserve-caution__table th {
    width: 30%;
    display: block;
    padding: 10px;
    border-left: 1px solid #aaa;
}
#detail .reserve-caution__table td {
    width: 70%;
    display: block;
    padding: 10px;
    border-left: 1px solid #aaa;
}
@media screen and (max-width: 767px) {
    #detail .reserve-caution__table .tr {
        border-left: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
    }
    #detail .reserve-caution__table th,
    #detail .reserve-caution__table td {
        width:100%;
        border-left: none;
    }
}


#detail .submit__Wrapper .btn {
    width: 35%;
    padding: 7px 0 7px;
    margin: 2%;
    text-align: center;
    border: 1px solid #c2c2c2;
}
#detail .submit__Wrapper .btn {
    width: 33%;
    margin: 2%;
    text-align: center;
    border: 1px solid #c2c2c2;
}

#detail .submit__Wrapper button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
    width: 100%;
    height: 100%;
    padding: 5px 0 5px;
}
#detail .submit__Wrapper .btn_back {
    background-color: rgb(250, 250, 250);
}
#detail .submit__Wrapper .btn_reserve {
    background-color: #00adef;
}
#detail .submit__Wrapper .btn_reserve button{
    color: #fff;
}

</style>
