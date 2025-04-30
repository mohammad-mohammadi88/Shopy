import { Product } from "@/interfaces/product";
import fetchHandler, {
    ErrorDispatch,
    FetchDispatch,
    SuccessDispatch,
} from "@Index/fetcher";
global.fetch = jest.fn();

describe("fetchHandler", () => {
    const mockDispatch = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("dispatches FETCH and SUCCESS on successful fetch", async () => {
        const mockData: {
            data: Product[];
            status: string;
            total_page: number;
        } = {
            data: [
                {
                    body: "body",
                    category: "AI",
                    price: 125,
                    created_at: 164564654655,
                    user_id: 1,
                    id: 12,
                    title: "title",
                },
            ],
            total_page: 1,
            status: "success",
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        await fetchHandler(mockDispatch, 8, 1);

        expect(mockDispatch).toHaveBeenCalledWith(FetchDispatch());
        expect(mockDispatch).toHaveBeenCalledWith(
            SuccessDispatch(1, mockData.data)
        );
    });

    it("dispatches ERROR on failed fetch", async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

        await fetchHandler(mockDispatch, 8, 1);

        expect(mockDispatch).toHaveBeenCalledWith(FetchDispatch());
        expect(mockDispatch).toHaveBeenCalledWith(
            ErrorDispatch(new Error("Network error"))
        );
    });
});
