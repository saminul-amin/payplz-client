export default function PurchaseCoin() {
  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {/* <!-- Card 1 --> */}
        <div class="flex flex-col items-center bg-white shadow-lg border border-gray-300 rounded-lg p-4 hover:shadow-xl hover:bg-gray-100 transition duration-300 hover:cursor-pointer">
          <h3 class="text-lg font-semibold">10 coins</h3>
          <span class="text-gray-500 text-sm">=</span>
          <p class="text-green-600 text-2xl font-bold">$1</p>
        </div>

        {/* <!-- Card 2 --> */}
        <div class="flex flex-col items-center bg-white shadow-lg border border-gray-300 rounded-lg p-4 hover:shadow-xl hover:bg-gray-100 transition duration-300 hover:cursor-pointer">
          <h3 class="text-lg font-semibold">150 coins</h3>
          <span class="text-gray-500 text-sm">=</span>
          <p class="text-green-600 text-2xl font-bold">$10</p>
        </div>

        {/* <!-- Card 3 --> */}
        <div class="flex flex-col items-center bg-white shadow-lg border border-gray-300 rounded-lg p-4 hover:shadow-xl hover:bg-gray-100 transition duration-300 hover:cursor-pointer">
          <h3 class="text-lg font-semibold">500 coins</h3>
          <span class="text-gray-500 text-sm">=</span>
          <p class="text-green-600 text-2xl font-bold">$20</p>
        </div>

        {/* <!-- Card 4 --> */}
        <div class="flex flex-col items-center bg-white shadow-lg border border-gray-300 rounded-lg p-4 hover:shadow-xl hover:bg-gray-100 transition duration-300 hover:cursor-pointer">
          <h3 class="text-lg font-semibold">1000 coins</h3>
          <span class="text-gray-500 text-sm">=</span>
          <p class="text-green-600 text-2xl font-bold">$35</p>
        </div>
      </div>
    </div>
  );
}
