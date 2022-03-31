
const NewPassword = () => {
  return (
    <>
      <h1 className="text-gray-400 text text-2xl text-left">
        Project & Tasks Administration App
      </h1>
      <h1 className="text-orange-600 font-black text-5xl text-right">TusDay</h1>
      <h1 className="uppercase text-gray-600 block text-1xl font-bold text-left mt-6 mb-1 ml-1">
        Create a new password
      </h1>

      <form className="mb-1 bg-white p-10 shadow-md rounded">
        <div className="my-5">
          <label
            className="uppercase text-gray-500 block text-xl font-bold"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Your new access password"
            className="w-full mt-1 p-3 border rounded bg-blue-50"
          />
        </div>
        <input
          type="submit"
          value="update"
          className="bg-orange-600 mb-5 text-white uppercase w-full py-2 font-bold rounded hover:cursor-pointer hover:bg-orange-900 transition-colors"
        />
      </form>
    </>
  )
}

export default NewPassword