import { client } from "./client";
import contractAbi from "../../stringStore.abi.json";

const contractAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`;

export async function getMessage() {
  try {
    const data = await client.readContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: "getMessage",
    });
    console.log("✨ Contract says:", data);
    return data;
  } catch (error) {
    console.error("Error reading contract:", error);
    throw error;
  }
}
